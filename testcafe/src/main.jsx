/** @format */

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap-css-only';
import Form from './form';
import ComplexForm from './complicated_form';

render(
    <React.Fragment>
        <h2 className="p-2">A Form</h2>
        <Form />
        <h2 className="p-2">Another Form</h2>
        <ComplexForm />
    </React.Fragment>,
    document.getElementById('root')
);
