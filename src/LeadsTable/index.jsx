import { useState, useEffect } from 'react';
import { Table, Select, Button, Spin } from 'antd';

import TokenLoader from '../tokenLoader';
import createColumns from './columnCreator';
import getLeads from './dataLoader';


function LeadsView(props) {
    const [loading, setLoading] = useState(true);
    // const [leads, setLeads] = useState(null);
    // const [filters, setFilters] = useState({});
    // const [filterValues, setFilterValues] = useState({});
    // const [initialized, setInitialized] = useState(false);
    const [state, setState] = useState({
        leads: null,
        filterValues: {
            language: [],
            technology: [],
            topic: [],
        },
        filters: {
            language: [],
            technology: [],
            topic: [],
        },
        initialized: false,
    });

    const { token, setToken } = TokenLoader();

    let columns = createColumns();

    useEffect(() => {
        if (!state.initialized) {
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
        getLeads(token, setState, setLoading, state.filters);
    };

    return (
        <div>
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
                            <Button onClick={handleSearch}>
                                Search
                            </Button>
                            <br />
                            <br />
                        </div>
                    }
                    <Table 
                        loading={state.loading}
                        rowKey={lead => lead.id}
                        columns = {columns}
                        dataSource={[...state.leads]}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />
                </div>
            )}
        </div>
    );
}

export default LeadsView;
