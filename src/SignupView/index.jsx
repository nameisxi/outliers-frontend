import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography } from 'antd';

import { CONFIGS } from '../config';

const { Title } = Typography;


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
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
            offset: 8,
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
            'email': values['email'],
            'password1': values['password'],
            'password2': values['passwordConfirm'],
        });
        setToken(token);

        navigate('/', { state: { from: location}, replace: true })
    };

    return (
        <div>
            <Title level={2}>Sign up</Title>
            <br/>
            <Form
                {...formItemLayout}
                form={form}
                name="signup"
                onFinish={handleSubmit}
                scrollToFirstError
            >
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
                        message: 'Please enter your password!',
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
                            message: 'Please confirm your password!',
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
