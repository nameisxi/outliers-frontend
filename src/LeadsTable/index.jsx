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
    const [nextPage, setNextPage] = useState(null);
    const [resultCount, setResultCount] = useState(null);
    const [leads, setLeads] = useState(null);
    const [filterValues, setFilterValues] = useState({
        languages: [],
        technologies: [],
        topics: [],
    });
    const [filters, setFilters] = useState({
        languages: props.programmingLanguages ? props.programmingLanguages : [],
        technologies: props.technologies ? props.technologies : [],
        topics: props.topics ? props.topics : [],
    });
    const [columns, setColumns] = useState([]);
    const [initialized, setInitialized] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!initialized) {
            createColumns(setColumns, filters);
            getLeads(token, setResultCount, setNextPage, setLeads, setFilterValues, setInitialized, setLoading, filters);
        }
    }, []);

    const handleLanguageSelect = (selectedLanguages) => {
        let currentFilters = filters;
        currentFilters.languages = selectedLanguages;
        setFilters(currentFilters);
    };

    const handleTechnologySelect = (selectedTechnologies) => {
        let currentFilters = filters;
        currentFilters.technologies = selectedTechnologies;
        setFilters(currentFilters);
    };

    const handleTopicSelect = (selectedTopics) => {
        let currentFilters = filters;
        currentFilters.topics = selectedTopics;
        setFilters(currentFilters);
    };

    const handleSearch = () => {
        createColumns(setColumns, filters);
        getLeads(token, setResultCount, setNextPage, setLeads, setFilterValues, setInitialized, setLoading, filters);
    };

    const handleMoreLeads = () => {
        createColumns(setColumns, filters);
        getLeads(token, setResultCount, setNextPage, setLeads, setFilterValues, setInitialized, setLoading, filters, nextPage, leads);
    }

    return (
        <div>
            { props.title &&
                <div>
                    <Title level={props.titleLevel}>{props.title}</Title>
                    {/* <br/> */}
                </div>
            }
            {loading || !initialized ? (
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
                                options={filterValues.programming_languages}
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
                                options={filterValues.topics}
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
                                <Col span={4} style={{ minWidth: 100 }}>
                                    <Statistic title="All Leads" value={resultCount} />
                                </Col>

                                <Col span={4} style={{ minWidth: 100 }}>
                                    <Statistic title="Active Leads" value={resultCount} />
                                </Col>
                                <Col span={4} style={{ minWidth: 100 }}>
                                    <Statistic title="Saved Leads" value={0} />
                                </Col>
                            </Row>
                            <br/>
                        

                            <Row>
                                {props.programmingLanguages && 
                                    <Col span={24}>
                                        <Text type="secondary">Programming Languages:&nbsp;</Text>
                                        {props.programmingLanguages.map((language) => {
                                            return <Tag key={language} color="blue">
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
                        loading={loading}
                        rowKey={lead => lead.id}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => navigate(`/leads/${record.id}`)
                            };
                        }}
                        columns = {columns}
                        dataSource={[...leads]}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />

                    { nextPage && 
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
