/** @format */

import React from 'react';
import withFormHandler from './with_form_handler';

export default withFormHandler(props => {
    return (
        <div className="card p-4">
            <div className="form-group">
                <label>Email</label>
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
});
