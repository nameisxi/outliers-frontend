import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CONFIGS } from '../config';


function SignupView({ setToken }) {
    const [emailAddress, setEmailAddress] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const signupUser = async (credentials) => {
        return fetch(
            `${CONFIGS.HOST}/users/employee/signup/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }
        ).then(data => data.json());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await signupUser({
          'email': emailAddress,
          'password1': password1,
          'password2': password2,
        });
        setToken(token);
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email address</p>
                    <input type="text" onChange={e => setEmailAddress(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password1" onChange={e => setPassword1(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password2" onChange={e => setPassword2(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Create an account</button>
                </div>
            </form>
        </div>
    );
}

SignupView.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default SignupView;
