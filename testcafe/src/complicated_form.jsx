/** @format */

import React from 'react';
import withFormHandler from './with_form_handler';
import {validateEmail, validateEmpty} from './validators';
import withFormValidator from './with_form_validator';

const ComplexForm = withFormValidator(
    withFormHandler(props => {
        return (
            <div className="card p-4">
                <div className="form-group">
                    <label>Name</label>
                    {props.fieldHasError('name') && (
                        <div className="alert alert-danger">
                            {props.getErrorMessage('name').join(' and ')}
                        </div>
                    )}
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            value={props.name || ''}
                            onChange={props.onChange.bind(this, 'name')}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    {props.fieldHasError('email') && (
                        <div className="alert alert-danger">
                            {props.getErrorMessage('email').join(' and ')}
                        </div>
                    )}
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            value={props.email || ''}
                            onChange={props.onChange.bind(this, 'email')}
                        />
                    </div>
                </div>

                <div>
                    <button className="btn btn-success" onClick={props.onValidate}>
                        Validate
                    </button>
                </div>
            </div>
        );
    })
);

export default () => {
    return (
        <ComplexForm
            formData={{
                name: '',
                email: '',
                phone: ''
            }}
            validators={[
                {
                    field: 'name',
                    rules: [
                        {
                            rule: validateEmpty,
                            message: 'I need your name please'
                        }
                    ]
                },
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
