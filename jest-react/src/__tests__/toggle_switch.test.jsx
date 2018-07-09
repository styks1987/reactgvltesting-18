/** @format */

import React from 'react';
// Simple way to render components
import renderer from 'react-test-renderer';
// We need a more complicated way to render our components
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
// Our component
import ToggleSwitch from '../toggle_switch';

// Just do a simple snapshot test
test('<ToggleSwitch /> renders with props on', () => {
    const component = renderer.create(<ToggleSwitch on={true} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// Test and assert by simulating click events and comparing button text
test('<ToggleSwitch /> can be toggled', () => {
    const component = mount(<ToggleSwitch />);

    expect(component.find('.btn-toggle').text()).toEqual('Turn Me ON');

    component.find('.btn-toggle').simulate('click');

    expect(component.find('.btn-toggle').text()).toEqual('Turn Me OFF');
});
