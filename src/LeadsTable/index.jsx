import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Table, Select, Button, Spin, Statistic, Row, Col, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';
import createColumns from './columnCreator';
import getLeads from './dataLoader';

const { Title, Text } = Typography;


function LeadsView(props) {
    const { token, setToken } = TokenLoader();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        resultCount: null,
        nextPage: null,
        leads: null,
        filterValues: {
            language: [],
            technology: [],
            topic: [],
        },
        filters: {
            language: props.programmingLanguages ? props.programmingLanguages : [],
            technology: props.technologies ? props.technologies : [],
            topic: props.topics ? props.topics : [],
        },
        initialized: false,
    });
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.initialized) {
            createColumns(setColumns, state.filters);
            getLeads(token, setState, setLoading, state.filters);
        }
    }, []);

    const handleLanguageSelect = (value) => {
        setState({
            leads: state.leads,
            filterValues: state.filterValues,
            filters: {
                language: value,
                // technologies: state.filters.technologies,
                // topics: state.filters.topics,
            },
            initialized: state.initialized,
        });
    };

    const handleTechnologySelect = (value) => {
        setState({
            leads: state.leads,
            filterValues: state.filterValues,
            filters: {
                // language: value,
                technology: value,
                // topics: state.filters.topics,
            },
            initialized: state.initialized,
        });
    };

    const handleTopicSelect = (value) => {
        setState({
            leads: state.leads,
            filterValues: state.filterValues,
            filters: {
                // language: value,
                // technologies: state.filters.technologies,
                topic: value,
            },
            initialized: state.initialized,
        });
    };

    const handleSearch = () => {
        createColumns(setColumns, state.filters);
        getLeads(token, setState, setLoading, state.filters);
    };

    const handleMoreLeads = () => {
        createColumns(setColumns, state.filters);
        getLeads(token, setState, setLoading, state.filters, state.nextPage, state.leads);
    }

    // console.log("Filters:", state.filters);

    return (
        <div>
            { props.title &&
                <div>
                    <Title level={props.titleLevel}>{props.title}</Title>
                    {/* <br/> */}
                </div>
            }
            {loading || !state.initialized ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    { props.searchable && 
                        <div>
                            <p>Programming languages:</p>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                defaultValue={[]}
                                onChange={handleLanguageSelect}
                                options={state.filterValues['programming_languages']}
                            />
                            <br />
                            <br />
                            {/* <p>Technologies:</p>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                defaultValue={[]}
                                onChange={handleTechnologySelect}
                                options={state.filterValues['technologies']}
                            />
                            <br /> */}
                            <p>Topics & technologies:</p>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                defaultValue={[]}
                                onChange={handleTopicSelect}
                                options={state.filterValues['topics']}
                            />
                            <br />
                            <br />
                            <Button 
                                type="primary"
                                onClick={handleSearch}>
                                Search
                            </Button>
                            <br />
                            <br />
                        </div>
                    }

                    { !props.searchable && 
                        <div>
                            <Row>
                                <Col span={4}>
                                    <Statistic title="All Leads" value={state.resultCount} />
                                </Col>

                                <Col span={4}>
                                    <Statistic title="Active Leads" value={state.resultCount} />
                                </Col>
                                <Col span={4}>
                                    <Statistic title="Saved Leads" value={0} />
                                </Col>
                            </Row>
                            <br/>
                        

                            <Row>
                                {props.programmingLanguages && 
                                    <Col span={24}>
                                        <Text type="secondary">Programming Languages:&nbsp;</Text>
                                        {props.programmingLanguages.map((language) => {
                                            return <Tag
                                                        key={language}
                                                        color="blue"
                                                    >
                                                        {/* &nbsp; */}
                                                        {language.toUpperCase()}
                                                    </Tag>;
                                        })}
                                    </Col>
                                }
                            </Row>
                            <br/>
                            <br/>
                        </div>
                    }

                    <Table 
                        loading={state.loading}
                        rowKey={lead => lead.id}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => navigate(`/leads/${record.id}`)
                            };
                        }}
                        columns = {columns}
                        dataSource={[...state.leads]}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />

                    { state.nextPage && 
                        <div
                            style={{
                                width: 200,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <br/>
                            <Button 
                                type="default"
                                loading={loading} 
                                icon={<PlusOutlined/>}
                                onClick={handleMoreLeads}
                                style={{
                                    width: 200,
                                }}
                            >
                                More leads
                            </Button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

export default LeadsView;
