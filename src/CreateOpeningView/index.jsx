import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Row, Col, PageHeader, Form, Input, InputNumber, Button, Select, Typography, Spin } from 'antd';

import TokenLoader from '../tokenLoader';
import CompensationField from './CompensationField';
import getFilterValues from './filterValueLoader';
import getOpening from './openingLoader';

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


function CreateOpeningView(props) {
    const { token, setToken } = TokenLoader();
    const { openingId } = useParams();

    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(null);
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
            `${CONFIGS.HOST}/openings/create/`, 
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

    const updateOpening = async (openingData) => {
        return fetch(
            `${CONFIGS.HOST}/openings/update/${openingId}/`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, 
                },
                body: JSON.stringify(openingData),
            }
        ).then((response) => response.json());
    };

    const handleSubmit = async (values) => {
        let response = null;
        const data = {
            'title': values['title'],
            'team': values['team'],
            'description': values['description'],
            'years_of_experience_min': values['years_of_experience_min'],
            'years_of_experience_max': values['years_of_experience_max'],
            'programming_languages': values['programming_languages'],
        };

        if (props.createOpening) {
            response = await createOpening(data);
        }
        
        if (!props.createOpening) {
            response = await updateOpening(data);
        }

        if (response['status'] === 200 && response['opening_id']) {
            navigate(`/openings/${response['opening_id']}`, { state: { from: location}, replace: true });
            window.scrollTo(0, 0);
        }
        // TODO handle error, e.g. non HTTP 200 response codes
    };

    const parseLanguageValues = (languages) => {
        let parsedValues = [];

        languages.forEach((language) => {
            parsedValues.push(language.name.toUpperCase());
        });

        return parsedValues;
    }

    useEffect(() => {
        if (!initialized) {
            if (!props.createOpening && !opening) {
                getOpening(token, openingId, setOpening, setLoading);
            }
            getFilterValues(token, setFilterValues, setLoading, setInitialized);
        }
    }, []);

    const handleCancelButtonClick = () => {
        navigate(`/openings/${opening.id}`, { state: { from: location}, replace: true });
        window.scrollTo(0, 0);
    };

    return (
        <div>
            {loading || !initialized ? (
                <Spin tip='Loading...' size='large' />
            ) : (
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
                                title={
                                    props.createOpening ? (
                                        <Title level={2} style={{ marginBottom: 0 }}>New opening</Title>
                                    ) : (
                                        <Title level={2} style={{ marginBottom: 0 }}>Update opening</Title>
                                    )
                                } 
                                style={{ padding: 0 }} 
                            />
                            { props.createOpening && 
                                <Text type='secondary'>Create a new job opening to get job candidate leads.</Text>
                            }   
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Title level={5} style={{ margin: 0}}>Basic information</Title>
                        </Form.Item>
                        <Form.Item
                            name='title'
                            label="Title"
                            initialValue={!props.createOpening ? opening.title : ''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required.',
                                },
                            ]}
                            style={{ marginLeft: 0 }}
                        >
                            <Input defaultValue={!props.createOpening ? opening.title : ''} />
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
                            <Input defaultValue={!props.createOpening ? opening.team : ''} />
                        </Form.Item>
                        <Form.Item 
                            name='description' 
                            label='Description'
                        >
                            <Input.TextArea defaultValue={!props.createOpening ? opening.description : ''} />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Title level={5} style={{ margin: 0}}>Requirements</Title>
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
                                        <InputNumber min={0} prefix='Min:' style={{ width: '100%' }} defaultValue={!props.createOpening ? opening.years_of_experience_min : 0} />
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
                                        <InputNumber min={0} prefix='Max:' style={{ width: '100%' }} defaultValue={(!props.createOpening && opening.years_of_experience_max < 100) ? opening.years_of_experience_max : undefined} />
                                    </Form.Item>
                                </Col>
                            </Row>                
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Title level={5} style={{ margin: 0}}>Skills</Title>
                        </Form.Item>
                        <Form.Item 
                            name='programming_languages' 
                            label='Programming languages'
                            layout='vertical'
                            initialValue={!props.createOpening ? parseLanguageValues(opening.programming_languages) : []}
                            rules={[
                                {
                                    required: true,
                                    message: 'At least one programming language is required.',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Please select"
                                defaultValue={!props.createOpening ? parseLanguageValues(opening.programming_languages) : []}
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
                            
                            { props.createOpening ? (
                                <Row>
                                    <Col span={24}>
                                    <Button type="primary" htmlType="submit">Create</Button>    
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col style={{paddingRight: 8}}>
                                        <Button type="primary" htmlType="submit">Update</Button>
                                    </Col>
                                    <Col>
                                        <Button type="secondary" onClick={handleCancelButtonClick}>Cancel</Button>
                                    </Col>
                                </Row>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default CreateOpeningView;