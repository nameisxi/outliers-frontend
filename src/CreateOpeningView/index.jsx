import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, PageHeader, Form, Input, InputNumber, Button, Select, Typography } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';
import CompensationField from './CompensationField';
import getFilerValues from './dataLoader';

import { CONFIGS } from '../config';

const { Title, Text } = Typography;


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

const validateMessages = {
    required: '${label} is required.',
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


function CreateOpeningView() {
    const { token, setToken } = TokenLoader();
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterValues, setFilterValues] = useState(
        {
            'programming_languages': [],
            'technologies': [],
            'topics': [],
        }
    );
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [topics, setTopics] = useState([]);
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
        ).then((response) => response.json());
    };

    const handleSubmit = async (values) => {
        console.log("VALUES:", values);

        const response = await createOpening({
            'title': values['title'],
            'team': values['team'],
            'description': values['description'],
            'years_of_experience_min': values['years_of_experience_min'],
            'years_of_experience_max': values['years_of_experience_max'],
            'programming_languages': values['programming_languages'],
            // 'technologies': null,
            // 'topics': null,
            // 'base_compensation_min': values['base_compensation_min'],
            // 'base_compensation_max': values['base_compensation_max'],
            // 'base_compensation_currency': values['base_compensation_currency'],
            // 'equity_compensation_min': values['equity_compensation_min'],
            // 'equity_compensation_max': values['equity_compensation_max'],
            // 'equity_compensation_currency': values['equity_compensation_currency'],
            // 'other_compensation_min': values['other_compensation_min'],
            // 'other_compensation_max': values['other_compensation_max'],
            // 'other_compensation_currency': values['other_compensation_currency'],
        });

        if (response['status'] === 200 && response['opening_id']) {
            navigate(`/openings/${response['opening_id']}`, { state: { from: location}, replace: true });
        }
        // TODO handle error, e.g. non HTTP 200 response codes
    };

    useEffect(() => {
        if (!initialized) {
            getFilerValues(token, setFilterValues, setLoading, setInitialized);
        }
    }, []);

    return (
        <div>
            <Form 
                {...formItemLayout}
                onFinish={handleSubmit} 
                validateMessages={validateMessages}
                style={{ 
                    maxWidth: 815, 
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                }}
            >
                <Form.Item {...tailFormItemLayout}>
                    <PageHeader 
                        title={<Title level={2} style={{ marginBottom: 0 }}>New opening</Title>} 
                        // subTitle="Create a new job opening to get job candidate leads."
                        style={{ padding: 0 }} 
                    />
                    <Text type='secondary'>Create a new job opening to get job candidate leads.</Text>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Title level={5}>Basic information</Title>
                </Form.Item>
                <Form.Item
                    name='title'
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{ marginLeft: 0 }}
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

                <Form.Item {...tailFormItemLayout}>
                    <Title level={5}>Requirements</Title>
                </Form.Item>
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

                <Form.Item {...tailFormItemLayout}>
                    <Title level={5}>Skills</Title>
                </Form.Item>
                <Form.Item 
                    name='programming_languages' 
                    label='Programming languages'
                    layout='vertical'
                >
                    <Select
                        mode="multiple"
                        placeholder="Please select"
                        defaultValue={[]}
                        options={filterValues.programming_languages}
                        onChange={(value) => setProgrammingLanguages(value)}
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
                </Tooltip>
                <br/> */}

                {/* <Title level={5}>Compensation</Title>
                <br/>
                <CompensationField minRequired={false} compensationName='base' handleOnChange={setBaseCompensationCurrency} />
                <CompensationField minRequired={false} compensationName='equity' handleOnChange={setEquityCompensationCurrency} />
                <CompensationField minRequired={false} compensationName='other' handleOnChange={setOtherCompensationCurrency} /> */}

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateOpeningView;