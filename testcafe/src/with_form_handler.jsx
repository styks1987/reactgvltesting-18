/** @format */

import React from 'react';
import update from 'immutability-helper';

const withFormHandler = ComponentContainer => {
    class WithFormHandler extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formData: props.formData
            };
        }

        handleChange = (field, e) => {
            const value = e.target.value;
            const updateTarget = {formData: {}};
            updateTarget.formData[field] = {$set: value};
            this.setState(update(this.state, updateTarget));
        };

        handleValidate = () => {
            this.props.onValidateRules(this.props.validators, this.state.formData);
        };

        render() {
            return (
                <ComponentContainer
                    onValidate={this.handleValidate}
                    onChange={this.handleChange}
                    valid={this.state.valid}
                    {...this.props}
                    {...this.state.formData}
                />
            );
        }
    }
    return WithFormHandler;
};

export default withFormHandler;
