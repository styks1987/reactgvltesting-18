/** @format */

import React from 'react';
// We need a more complicated way to render our components
// https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
import {mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
// Our component
import withFormValidator from '../with_form_validator';
import {validateEmail} from '../validators';

// Test that Field has error works properly
test('withFormValidator fieldHasError', () => {
    const TestChild = () => <div>Test</div>;

    const Validator = withFormValidator(TestChild);

    const component = shallow(<Validator />);

    expect(component.instance().fieldHasError('email')).toBe(false);

    component.instance().setState({
        errors: [{field: 'email'}]
    });

    expect(component.instance().fieldHasError('email')).toBe(true);

    component.instance().setState({
        errors: [{field: 'otherfield'}]
    });

    expect(component.instance().fieldHasError('email')).toBe(false);
});

// Test that Field has error works properly
test('withFormValidator', () => {
    const TestChild = props => {
        if (props.fieldHasError('email')) {
            return <div>Error</div>;
        }

        return <div>Test</div>;
    };

    const Validator = withFormValidator(TestChild);

    const component = mount(<Validator />);

    expect(component.html()).toBe('<div>Test</div>');

    const rules = [
        {
            field: 'email',
            rules: [
                {
                    rule: validateEmail,
                    message: 'Your email is invalid'
                }
            ]
        }
    ];

    component
        .children()
        .props()
        .onValidateRules(rules, {email: 'lalalalalaalnopass'});

    // I am expecting the error to render because the email is invalid
    expect(component.html()).toBe('<div>Error</div>');

    // The validator component should have the error entry
    expect(component.state().errors).toEqual([
        {field: 'email', messages: ['Your email is invalid']}
    ]);

    // Not sure why but the child props will not update without this
    component.update();
    // The child should also receive the errors
    expect(component.children().props().errors).toEqual([
        {field: 'email', messages: ['Your email is invalid']}
    ]);

    // Pass a valid email
    component
        .children()
        .props()
        .onValidateRules(rules, {email: 'testing@email.com'});

    // Test that the errors are not found
    expect(component.html()).toBe('<div>Test</div>');
    expect(component.state().errors).toEqual([]);
    // Not sure why but the child props will not update without this
    component.update();
    expect(component.children().props().errors).toEqual([]);
});
