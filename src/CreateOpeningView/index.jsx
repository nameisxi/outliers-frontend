import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, PageHeader, Form, Input, InputNumber, Button, Select, Typography } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';
import CompensationField from './CompensationField';
import { CONFIGS } from '../config';

const { Title} = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required.',
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


function CreateOpeningView() {
    const { token, setToken } = TokenLoader();
    const [filterValues, setFilterValues] = useState(
        {
            'programming_languages': null,
            'technologies': null,
            'topics': null,
        }
    );
    const [baseCompensationCurrency, setBaseCompensationCurrency] = useState('usd');
    const [equityCompensationCurrency, setEquityCompensationCurrency] = useState('usd');
    const [otherCompensationCurrency, setOtherCompensationCurrency] = useState('usd');

    const navigate = useNavigate();
    let location = useLocation();

    const createOpening = async (openingData) => {
        return fetch(
            `${CONFIGS.HOST}/openings/create-opening/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, 
                },
                body: JSON.stringify(openingData),
            }
        ).then((response) => response.status);
    };

    const handleSubmit = async (values) => {
        console.log("VALUES:", values);

        const resultCode = await createOpening({
            'title': values['title'],
            'team': values['team'],
            'description': values['description'],
            'years_of_experience_min': values['years_of_experience_min'],
            'years_of_experience_max': values['years_of_experience_max'],
            'programming_languages': values['programming_languages'],
            'technologies': null,
            'topics': null,
            'base_compensation_min': values['base_compensation_min'],
            'base_compensation_max': values['base_compensation_max'],
            'base_compensation_currency': values['base_compensation_currency'],
            'equity_compensation_min': values['equity_compensation_min'],
            'equity_compensation_max': values['equity_compensation_max'],
            'equity_compensation_currency': values['equity_compensation_currency'],
            'other_compensation_min': values['other_compensation_min'],
            'other_compensation_max': values['other_compensation_max'],
            'other_compensation_currency': values['other_compensation_currency'],
        });

        if (resultCode === 200) {
            navigate('/', { state: { from: location}, replace: true });
        }
        // TODO handle error, e.g. non HTTP 200 response codes
    };

    return (
        <div>
            <PageHeader title='New opening' />
            <br/>

            <Form 
                {...layout} 
                onFinish={handleSubmit} 
                validateMessages={validateMessages}
            >
                <Title level={5}>Basic information</Title>
                <br/>
                <Form.Item
                    name='title'
                    label="Title"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='team'
                    label="Team"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name='description' 
                    label='Description'
                >
                    <Input.TextArea />
                </Form.Item>
                <br/>

                <Title level={5}>Requirements</Title>
                <br/>
                <Form.Item
                    name='years_of_experience'
                    label="Years of experience"
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name='years_of_experience_min'
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        required: false,
                                    },
                                ]}
                            >
                                <InputNumber min={0} prefix='Min:' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{ textAlign: 'center' }}>
                            <p>-</p>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='years_of_experience_max'
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        required: false,
                                    },
                                ]}
                            >
                                <InputNumber min={0} prefix='Max:' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>                
                </Form.Item>
                <br/>

                <Title level={5}>Skills</Title>
                <br/>
                <Form.Item 
                    name='programming_languages' 
                    label='Programming languages'
                >
                    <Select
                        mode="multiple"
                        placeholder="Please select"
                        defaultValue={[]}
                        options={filterValues.programming_languages}
                    />
                </Form.Item>

                {/* <Tooltip title='If Required is selected, then a job candidate must have experience using all of the programming languages. If Preferred is selected, they only have to have experience using one of the selected programming languages.'>
                    <Alert 
                        message={
                            <div>
                                <p>Are all of the programming languages required? <InfoCircleOutlined/></p>
                                <Form.Item name='programming_languages_required_preferred'>   
                                    <Radio.Group defaultValue={'required'}>
                                        <Radio value={'required'}>Required</Radio>
                                        <Radio value={'preferred'}>Preferred</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        } 
                        type="warning" 
                    />
                </Tooltip> */}
                <br/>

                <Title level={5}>Compensation</Title>
                <br/>
                <CompensationField minRequired={false} compensationName='base' handleOnChange={setBaseCompensationCurrency} />
                <CompensationField minRequired={false} compensationName='equity' handleOnChange={setEquityCompensationCurrency} />
                <CompensationField minRequired={false} compensationName='other' handleOnChange={setOtherCompensationCurrency} />

                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateOpeningView;