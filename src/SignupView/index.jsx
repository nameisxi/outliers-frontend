import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, PageHeader } from 'antd';

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


function SignupView({ setToken }) {
    const [emailAddress, setEmailAddress] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    let location = useLocation();

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

    const handleSubmit = async (values) => {
        const token = await signupUser({
            'name': values['name'],
            'email': values['email'],
            'password1': values['password'],
            'password2': values['passwordConfirm'],
        });
        setToken(token);

        navigate('/', { state: { from: location}, replace: true });
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="signup"
                onFinish={handleSubmit}
                scrollToFirstError
                // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                style={{ 
                    maxWidth: 815, 
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                }}
            >
                <Form.Item {...tailFormItemLayout}>
                    <PageHeader 
                        title={<Title level={2} style={{ marginBottom: 0 }}>Sign up</Title>} 
                        style={{ padding: 0 }} 
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your name.',
                    },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The email that you entered is not valid!',
                    },
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    tooltip="Has to be at least 8 characters long"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your password.',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="Confirm Password"
                    tooltip="Has to be at least 8 characters long"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password.',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                    I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Sign up</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

SignupView.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default SignupView;
