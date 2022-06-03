import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Table, Select, Button, Spin, Statistic, Row, Col, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import scrollIntoView from 'scroll-into-view';
import styled from "styled-components";

import TokenLoader from '../tokenLoader';
import createColumns from './columnCreator';
import getLeads from './dataLoader';

const { Title, Text } = Typography;


function LeadsView(props) {
    const { token, setToken } = TokenLoader();
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
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
    const location = useLocation();

    const [candidateId, setCandidateId] = useState(location.state?.from ? parseInt(location.state.from.pathname.split('/candidates/')[1]) : null);

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

    const handleRowClick = (record) => {
        navigate(`/openings/${props.openingId}/candidates/${record.id}`);
        window.scrollTo(0, 0);
    }

    const handleScroll = () => {
        scrollIntoView(document.querySelector('.scroll-row'), {
            align: {
                top: 0.5, // 0.5 == center
                left: 0, 
            },
        });
    };

    // useEffect(() => {
    //     if (initialized && candidateId && !scrolled) {
    //         handleScroll();
    //         setScrolled(true)
    //     }
    // }, [loading]);

    const StyledTable = styled((props) => <Table {...props} />)`
        && tbody > tr:hover > td {
            cursor: pointer;
        }
    `;

    const shadeColor = (color, percent) => {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    };

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
                                {props.programmingLanguageColors && 
                                    <Col span={24}>
                                        <Text type="secondary">Programming Languages:&nbsp;</Text>
                                        {props.programmingLanguageColors.map((language) => {
                                            if (filters.languages && filters.languages.includes(language.name) && !language.color) {
                                                language.color = '#2f54eb';
                                            }

                                            return <Tag 
                                                        key={language.name} 
                                                        // color="blue"
                                                        style={{
                                                            backgroundColor: filters.languages && filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}3F` : null,
                                                            borderColor: filters.languages && filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}7F` : null,
                                                            color: filters.languages && filters.languages.includes(language.name) && language.color ? shadeColor(language.color, -20) : null,
                                                        }}
                                                    >
                                                        {language.name.toUpperCase()}
                                                    </Tag>;
                                        })}
                                    </Col>
                                }
                            </Row>
                            <br/>
                            <br/>
                        </div>
                    }

                    <StyledTable 
                        loading={loading}
                        rowKey={lead => lead.id}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => handleRowClick(record)
                            };
                        }}
                        rowClassName={(record, index) => record.id === candidateId ? 'scroll-row' : ''}
                        columns = {columns}
                        dataSource={[...leads]}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                        size='small'
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
