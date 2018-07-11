/** @format */

import React from 'react';

export default ComponentContainer => {
    class WithFormValidator extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                errors: []
            };
        }

        handleValidateRules = (validators, formData) => {
            const errors = validators.reduce((allErrors, fieldValidator) => {
                const failedRules = this.validateField(
                    fieldValidator,
                    formData[fieldValidator.field],
                    formData
                );
                if (failedRules) {
                    allErrors.push({
                        field: fieldValidator.field,
                        messages: failedRules.map(rule => rule.message)
                    });
                }
                return allErrors;
            }, []);

            this.setState({errors: errors});
        };

        validateField = (fieldValidator, value, context) => {
            const rules = fieldValidator.rules;

            const results = rules.filter(rule => {
                return this.handleValidateRule(rule.rule, value, context);
            });

            return results.length == 0 ? false : results;
        };

        handleValidateRule = (validationMethod, value, context) => {
            if (typeof validationMethod == 'function') {
                return validationMethod(value, context);
            }

            return false;
        };

        fieldHasError = field => {
            const fields = this.state.errors.map(error => error.field);

            return fields.indexOf(field) > -1;
        };

        render() {
            return (
                <ComponentContainer
                    {...this.props}
                    errors={this.state.errors}
                    fieldHasError={this.fieldHasError}
                    hasErrors={this.state.errors.length > 0}
                    onValidateRules={this.handleValidateRules}
                />
            );
        }
    }
    return WithFormValidator;
};
