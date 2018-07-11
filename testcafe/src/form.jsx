/** @format */

import React from 'react';
import withFormHandler from './with_form_handler';
import {validateEmail} from './validators';
import withFormValidator from './with_form_validator';

const SimpleForm = withFormValidator(
    withFormHandler(props => {
        return (
            <div className="card p-4 form">
                <div className="form-group">
                    <label>Email</label>
                    {props.fieldHasError('email') && (
                        <div className={'alert alert-danger alert-email'}>
                            {props.getErrorMessage('email').join(' and ')}
                        </div>
                    )}
                    <div>
                        <input
                            className="form-control"
                            name="email"
                            type="text"
                            value={props.email || ''}
                            onChange={props.onChange.bind(this, 'email')}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn btn-success validate-form" onClick={props.onValidate}>
                        Validate
                    </button>
                </div>
            </div>
        );
    })
);

export default () => {
    return (
        <SimpleForm
            formData={{
                email: ''
            }}
            validators={[
                {
                    field: 'email',
                    rules: [
                        {
                            rule: validateEmail,
                            message: 'Your email is invalid'
                        }
                    ]
                }
            ]}
        />
    );
};
