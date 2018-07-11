/** @format */

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap-css-only';
import Form from './form';
import ComplexForm from './complicated_form';

render(
    <React.Fragment>
        <Form />
        <ComplexForm />
    </React.Fragment>,
    document.getElementById('root')
);
