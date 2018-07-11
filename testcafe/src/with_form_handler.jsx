/** @format */

import React from 'react';
import update from 'immutability-helper';
import withFormValidator from './with_form_validator';
import {validateEmail} from './validators';

const withFormHandler = ComponentContainer => {
    class WithFormHandler extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formData: {
                    email: ''
                }
            };
        }

        handleChange = (field, e) => {
            const value = e.target.value;
            const updateTarget = {formData: {}};
            updateTarget.formData[field] = {$set: value};
            this.setState(update(this.state, updateTarget));
        };

        handleValidate = () => {
            const validators = [
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

            props.onValidateRules(validators, this.state.formData);
        };

        render() {
            return (
                <ComponentContainer
                    onValidate={this.handleValidate}
                    onChange={this.handleChange}
                    valid={this.state.valid}
                    errors={this.props.errors}
                    hasErrors={this.props.hasErrors}
                    {...this.state.formData}
                />
            );
        }
    }
    return withFormValidator(WithFormHandler);
};

export default withFormHandler;
