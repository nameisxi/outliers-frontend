import React, { useState, useEffect } from 'react';
import { Table, Typography, Tag } from 'antd';

import { CONFIGS } from '../config';

const { Title } = Typography;


function LeadsView() {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        data: [],
        columns: null,
        currentPage: 1,
        currentPage: 1,
        filters: {
            programming_languages: null,
            technologies: null,
        },
        sorter: {},
        filtersSet: false,
    });
    // const [state, setState] = useState({
    //     data: [],
    //     columns: null,
    //     currentPage: 1,
    //     resultCount: 1,
    //     resultCountNeeded: true,
    //     query: null,
    //     filters: {
    //         incorporation_country: null,
    //         sales_stage: null,
    //         onboarding_status: null,
    //         onboarding_manager: null,
    //         pricing_plan: null,
    //         industry: null,
    //         has_used_competing_products: null,
    //     },
    //     sorter: {
    //         column: null,
    //         order: null
    //     },
    //     filtersSet: false,
    //     sorterSet: false,
    // });

    const setFilters = (column, filterValues, field) => {
        column.filters = filterValues;
        column.OnFilter = (value, record) => {
            let filters = state.filters;

            let selectedValues = filters[field] ? filters[field] : [];
            selectedValues.push(value);

            filters[field] = selectedValues;

            setState({ filters: filters, resultCountNeeded: true })

            return true;
        };

        return column
    }

    const setTags = (column) => {
        column.render = (tags) => {
            let sorted_tags = [];
            for (let tag in tags) {
                sorted_tags.push([tag, tags[tag]]);
            }

            sorted_tags.sort(function(a, b) {
                return b[1] - a[1];
            });

            return (
                <div>
                    {sorted_tags.slice(0,5).map(([tag, percentage]) => {
                        return (
                            <Tag 
                                key={tag}
                                icon={
                                    <img 
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tag}/${tag}-plain.svg`} 
                                        height={15}
                                        width={15}
                                        style={{ verticalAlign: 'center' }}
                                    />
                                }
                                color="blue"
                            >
                                &nbsp;
                                { `${tag.toUpperCase()} (${Math.round(percentage * 100)}%)` }
                            </Tag>
                        );
                    })}
                </div>
            );
        };

        return column;
    }

    const createGithubColumns = (object) => {
        let columns = [];
        const fields = Object.keys(object);
        const droppedGithubColumns = ['created_at', 'id', 'owner', 'profile_api_url', 'twitter_username', 'updated_at', 'user_id'];

        fields.filter((field) => !droppedGithubColumns.includes(field)).forEach(async (field) => {
            let githubTitleValue = field.replaceAll('_', ' ');
            githubTitleValue = githubTitleValue.charAt(0).toUpperCase() + githubTitleValue.slice(1);
            
            let column = { title: githubTitleValue, dataIndex: ['github_account', '0', field], key: field };

            if (field === 'programming_languages') {
                column = setFilters(column, ['php', 'javascript', 'python'], field);
                column = setTags(column);
            };

            if (field === 'technologies') {
                column = setFilters(column, ['computer-vision', 'nlp', 'unity3d'], field);
                column = setTags(column);
            };

            columns.push(column);
        });

        return columns;
    };

    const createColumns = (object, filterValues) => {
        let columns = [];
        const fields = Object.keys(object);
        const droppedCandidateColumns = ['created_at', 'updated_at'];
        
        fields.filter((field) => !droppedCandidateColumns.includes(field)).forEach(async (field) => {
            let titleValue = field.replaceAll('_', ' ');
            titleValue = titleValue.charAt(0).toUpperCase() + titleValue.slice(1);
            
            let column = { title: titleValue, dataIndex: field, key: field };

            if (field === 'github_account') column.children = createGithubColumns(object.github_account[0]);

            // if (field === 'incorporation_country') column = setFilters(column, filterValues[field], field);
            // if (field === 'investor_type') column = setFilters(column, filterValues[field], field);
            // if (field === 'investing_stages') column = setFilters(column, filterValues[field], field);
            // if (field === 'investing_regions') column = setFilters(column, filterValues[field], field);
            // if (field === 'investing_industries') column = setFilters(column, filterValues[field], field);

            // if (field === 'network_share') column = setSorter(column, field, 'int');

            // if (field === 'sales_stage') column = setFilters(column, filterValues[field], field);
            // if (field === 'sales_warmth_level') column = setFilters(column, filterValues[field], field);
            // if (field === 'sales_lost_reason') column = setFilters(column, filterValues[field], field);
            // if (field === 'sales_interest_reason') column = setFilters(column, filterValues[field], field);
            // if (field === 'has_used_competing_products') column = setFilters(column, filterValues[field], field);
            // if (field === 'erp_tools_in_use') column = setFilters(column, filterValues[field], field);

            // if (field === 'onboarding_status') column = setFilters(column, filterValues[field], field);
            // if (field === 'onboarding_manager') column = setFilters(column, filterValues[field], field);
            // if (field === 'onboarding_hours_spent') column = setSorter(column, field, 'int');
            // if (field === 'onboarding_start_date') column = setSorter(column, field, 'date');
            // if (field === 'onboarding_end_date') column = setSorter(column, field, 'date');
            // if (field === 'last_contact_date') column = setSorter(column, field, 'date');
            // if (field === 'last_login_date') column = setSorter(column, field, 'date');

            // if (field === 'pricing_plan') column = setFilters(column, filterValues[field], field);
            // if (field === 'service_start_date') setSorter(column, field, 'date');
            // if (field === 'pricing_start_date') setSorter(column, field, 'date');
            // if (field === 'incorporation_date') column = setSorter(column, field, 'date');
            // if (field === 'incorporation_type') column = setFilters(column, filterValues[field], field);

            columns.push(column);
        });

        console.log("COLUMNS:", columns);

        return columns;
    };

    const getLeads = (currentPage=state.currentPage, filters=state.filters, sorter=state.sorter) => {
        setLoading(true);

        const url = `${CONFIGS.HOST}/users/?format=json`;
        console.log(url);

        Promise.all([
            fetch(url),
            // fetch(filters)
        ]).then((responses) => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }))
        }).then((data) => {
            const leads = data[0];

            let resultCount = state.resultCount;
            if (state.resultCountNeeded) {
                resultCount = data[0].count;
            }

            // const filterValues = {
            //     countryValues: data[1]['countries'],
            //     salesStageValues: data[1]['sales_stages'],
            //     salesWarmthLevelValues: data[1]['sales_warmth_levels'],
            //     salesLostReasonValues: data[1]['sales_lost_reasons'],
            //     salesInterestReasonValues: data[1]['sales_interest_reasons'],
            //     hasUsedCompetingProductsValues: data[1]['has_used_competing_products'],
            //     onboardingStatusValues: data[1]['onboarding_statuses'],
            //     onboardingManagerValues: data[1]['onboarding_managers'],
            //     pricingPlanValues: data[1]['pricing_plans'],
            //     industryValues: data[1]['industries'],
            //     hasTransferHistoriesValues: data[1]['has_transfer_histories'],
            //     hasCapitalChangeHistories: data[1]['has_capital_change_histories'],
                
            // };
            const filterValues = {};
            const columns = leads ? createColumns(leads[0], filterValues) : state.columns;

            const updatedState = {
                data: leads,
                columns: columns,
                currentPage: currentPage,
                resultCount: resultCount,
                // resultCountNeeded: true,
                // query: query,
                // filters: filters,
                // filtersSet: filtersSet,
                // sorter: sorter,
                // sorterSet: sorterSet
            }

            console.log(currentPage);

            setState(updatedState)
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!state.columns) {
            getLeads();
        }
    }, []);

    return (
        <div id="LeadsView">
            {loading ? (
                'Loading...'
            ) : (
                <div id="LeadsTable">
                    <Table 
                        rowKey={record => record.id}
                        columns = {state.columns}
                        dataSource={[...state.data]}
                        scroll={{ x: 'max-content' }}
                        onChange={(current, filters, sorter) => {
                            getLeads(current, filters, sorter);
                        }}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10], current: state.currentPage, total: state.resultCount}}
                    />
                </div>
            )}
        </div>
    );
}

export default LeadsView;
