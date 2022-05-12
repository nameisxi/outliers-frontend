import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { CONFIGS } from '../config';

const { Title } = Typography;


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

    const handleSubmit = async (values) => {
        const token = await loginUser({
            'email': values['email'],
            'password': values['password'],
        });
        setToken(token);

        navigate('/', { state: { from: location}, replace: true })
    };

    return (
        <div>
            <Title level={2}>Login</Title>
            <br/>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {/* <a className="login-form-forgot" href="">
                        Forgot password
                    </a> */}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    <br/>
                    <br/>
                    New here? <a href={`${CONFIGS.CLIENT}/signup/`}>Sign up!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

LoginView.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginView;
