/** @format */

import React from 'react';
import withFormHandler from './with_form_handler';
import {validateEmail, validateEmpty} from './validators';
import withFormValidator from './with_form_validator';

const InputWithErrorHandler = props => {
    return (
        <React.Fragment>
            {props.fieldHasError(props.field) && (
                <div className={'alert alert-danger alert-' + props.field}>
                    {props.getErrorMessage(props.field).join(' and ')}
                </div>
            )}
            <div>
                <input
                    className="form-control"
                    type="text"
                    name={props.field}
                    value={props.value || ''}
                    onChange={props.onChange.bind(this, props.field)}
                />
            </div>
        </React.Fragment>
    );
};

const ComplexForm = withFormValidator(
    withFormHandler(props => {
        return (
            <div className="card p-4 complex-form">
                <div className="form-group">
                    <label>Name</label>
                    <InputWithErrorHandler
                        field={'name'}
                        value={props.name}
                        fieldHasError={props.fieldHasError}
                        getErrorMessage={props.getErrorMessage}
                        onChange={props.onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <InputWithErrorHandler
                        field={'email'}
                        value={props.email}
                        fieldHasError={props.fieldHasError}
                        getErrorMessage={props.getErrorMessage}
                        onChange={props.onChange}
                    />
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
