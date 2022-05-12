import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CONFIGS } from '../config';


function LoginView({ setToken }) {
    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    let location = useLocation();

    const loginUser = async (credentials) => {
        return fetch(
            `${CONFIGS.HOST}/users/login/`, 
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

        const token = await loginUser({
            'email': emailAddress,
            'password': password,
        });
        setToken(token);

        navigate('/', { state: { from: location}, replace: true })
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email address</p>
                    <input type="text" onChange={e => setEmailAddress(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <a href={`${CONFIGS.CLIENT}/signup/`}>New here? Create an account here.</a>
        </div>
    );
}

LoginView.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginView;
