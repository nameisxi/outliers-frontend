import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Typography, PageHeader } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { CONFIGS } from '../config';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
        md: {
            span: 5,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 6,
        },
        md: {
            span: 16,
            offset: 5,
        },
    },
};


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
        window.scrollTo(0, 0);      
    };

    return (
        <div>
            
            <Form
                // {...formItemLayout}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit} 
                style={{ 
                    maxWidth: 400, 
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                }}
            >
                <Form.Item>
                    <PageHeader 
                        title={<Title level={2} style={{ marginBottom: 0 }}>Login</Title>} 
                        style={{ padding: 0 }} 
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                    ]}
                >
                    <Input 
                        size='large'
                        prefix={<MailOutlined 
                        className="site-form-item-icon" />} 
                        placeholder="Email" 
                        style={{ borderRadius: 4 }}
                    />
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
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{ borderRadius: 4 }}
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
                    <Button 
                        size='large'
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        style={{ width: '100%', borderRadius: 6 }}
                    >
                        Log in
                    </Button>
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
