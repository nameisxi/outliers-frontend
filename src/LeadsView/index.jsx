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
        // resultCount: 1,
        // resultCountNeeded: true,
        filters: {
            programming_languages: null,
            technologies: null,
        },
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
        column.filterSearch = true;
        column.onFilter = (value, record) => {
            let filters = state.filters;

            let selectedValues = filters[field] ? filters[field] : [];
            selectedValues.push(value);

            filters[field] = selectedValues;

            setState({ 
                filters: filters, 
                // resultCountNeeded: true, 
                filtersSet: true 
            });

            return true;
            // return Object.keys(record.github_account[0].programming_languages).includes(value);
        };

        return column;
    }

    const setTags = (column) => {
        column.render = (tags) => {
            let sorted_tags = [];
            const programmingLanguages = ['asp.net', 'hack', 'idris', 'sourcepawn', 'nginx', 'matlab', 'lua', 'tcl', 'handlebars', 'dart', 'hcl', 'python', 'ruby', 'plsql', 'groovy', 'jinja', 'codeql', 'io', 'rescript', 'starlark', 'roff', 'mustache', 'php', 'stylus', 'common lisp', 'tsql', 'solidity', 'go', 'rich text format', 'crystal', 'visual basic .net', 'assembly', 'vue', 'thrift', 'verilog', 'standard ml', 'haxe', 'lilypond', 'classic asp', 'maxscript', 'zig', 'scheme', 'julia', 'ejs', 'pug', 'swig', 'v', 'java', 'groff', 'reason', 'basic', 'viml', 'autohotkey', 'vim snippet', 'scala', 'apacheconf', 'openedge abl', 'brainfuck', 'powershell', 'nim', 'c#', 'yacc', 'glsl', 'jupyter notebook', 'less', 'smali', 'webassembly', 'makefile', 'coffeescript', 'tex', 'arduino', 'applescript', 'objective-c++', 'objective-c', 'zephir', 'bicep', 'kotlin', 'clojure', 'r', 'css', 'xslt', 'shaderlab', 'shell', 'javascript', 'perl', 'html', 'dockerfile', 'd', 'svelte', 'sage', 'c++', 'cmake', 'digital command language', 'vba', 'c', 'racket', 'typescript', 'rust', 'elixir', 'ec', 'actionscript', 'scss', 'vim script', 'haskell', 'sass', 'elm', 'f#', 'ocaml', 'batchfile', 'processing', 'cobol', 'emacs lisp', 'swift'];
            
            if (column.title === 'Technologies') {
                Object.entries(tags).forEach(([tag, percentage]) => {
                    let isLanguage = false;
                    programmingLanguages.forEach((language) => {
                        if (tag.includes(language) && language.length >= 3) {
                            isLanguage = true;
                        }
                    });
                    if (!isLanguage) {
                        if (tag !== '0' && tag !== '1') {
                            sorted_tags.push([tag, tags[tag]]);
                        }
                    }
                });
            } else {
                for (let tag in tags) {
                    sorted_tags.push([tag, tags[tag]]);
                }
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

    const createGithubColumns = (object, filterValues) => {
        let columns = [];
        const fields = Object.keys(object);
        const droppedGithubColumns = ['created_at', 'id', 'owner', 'profile_api_url', 'twitter_username', 'updated_at', 'user_id', 'followers', 'repos_count', 'gists_count', 'username', 'name', 'email', 'website'];

        fields.filter((field) => !droppedGithubColumns.includes(field)).forEach(async (field) => {
            let githubTitleValue = field.replaceAll('_', ' ');
            githubTitleValue = githubTitleValue.charAt(0).toUpperCase() + githubTitleValue.slice(1);
            
            let column = { title: githubTitleValue, dataIndex: ['github_account', '0', field], key: field };

            if (field === 'profile_html_url') {
                column.title = 'Profile url';
            }

            if (field === 'programming_languages') {
                column = setFilters(column, [...filterValues[field]], field);
                column = setTags(column);
            };

            if (field === 'technologies') {
                column = setFilters(column, [...filterValues[field]], field);
                column = setTags(column);
            };

            columns.push(column);
        });

        return columns;
    };

    const createColumns = (object, filterValues) => {
        console.log("createColumns FIRED");
        let columns = [];
        const fields = Object.keys(object);
        const droppedCandidateColumns = ['created_at', 'updated_at'];
        
        fields.filter((field) => !droppedCandidateColumns.includes(field)).forEach(async (field) => {
            let titleValue = field.replaceAll('_', ' ');
            titleValue = titleValue.charAt(0).toUpperCase() + titleValue.slice(1);
            
            let column = { title: titleValue, dataIndex: field, key: field };

            if (field === 'github_account') column.children = createGithubColumns(object.github_account[0], filterValues);

            columns.push(column);
        });

        return columns;
    };

    const getLeads = (newPage=null, newFilters=null, newSorter=null) => {
        setLoading(true);

        console.log('New Filters:', newFilters);
        console.log("FiltersSet:", state.filtersSet);

        const currentPage = newPage ? newPage : state.currentPage;
        const filters = newFilters ? newFilters : state.filters;

        console.log('Filters:', filters);

        if (filters) {
            for (let [key, value] of Object.entries(filters)) {
                filters[key] = filters[key] ? filters[key] : state.filters[key];
            }
        }

        let filtersSet = false;
        for (let [key, value] of Object.entries(filters)) {
            if (value !== null) filtersSet = true;
        }
        console.log("new filtersSet:", filtersSet)


        let url = `${CONFIGS.HOST}/users/?format=json`;

        if (filters) {
            Object.entries(filters).forEach(([filter, values]) => {
                if (values) {
                    values.forEach((value) => {
                        url = `${url}&${filter}=${value}`;
                    });
                }
            });
        }

        console.log("NEW URL:", url);

        Promise.all([
            fetch(url),
            // fetch(filters)
        ]).then((responses) => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }))
        }).then((data) => {
            const leads = data[0];

            // let resultCount = state.resultCount;
            // if (state.resultCountNeeded) {
            //     resultCount = data[0].count;
            //     console.log("RESULT COUNT:", resultCount);
            // }

            const filterValues = {
                programming_languages: {},
                technologies: {},
            };
            
            for (let lead in leads) {
                const languages = leads[lead].github_account[0].programming_languages;
                
                Object.entries(languages).forEach(([language, percentage]) => {
                    if (!filterValues.programming_languages.hasOwnProperty(language)) {
                        filterValues.programming_languages[language] = 0;
                    }
                    filterValues.programming_languages[language] += 1;
                    // filterValues.programming_languages.add(language);
                });

                const technologies = leads[lead].github_account[0].technologies;
                Object.entries(technologies).forEach(([technology, percentage]) => {
                    if (!filterValues.technologies.hasOwnProperty(technology)) {
                        filterValues.technologies[technology] = 0;
                    }
                    filterValues.technologies[technology] += 1;
                    // filterValues.technologies.add(technology);
                });
            }  

            Object.entries(filterValues).forEach(([filter, values]) => {
                const newValues = [];
                Object.entries(values).forEach(([key, count]) => {
                    newValues.push({text: `${key} (${count})`, value: key});
                });
                filterValues[filter] = newValues;
            });

            console.log(filterValues.programming_languages);

            const columns = leads[0] ? createColumns(leads[0], filterValues) : state.columns;
            // const columns = state.columns ? state.columns : createColumns(leads[0], filterValues);


            const updatedState = {
                data: leads,
                columns: columns,
                currentPage: currentPage,
                // resultCount: resultCount,
                // resultCountNeeded: true,
                // query: query,
                filters: filters,
                filtersSet: filtersSet,
                // sorter: sorter,
                // sorterSet: sorterSet
            }

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
                            getLeads(current.current, filters, sorter);
                        }}
                        pagination={{ 
                            defaultPageSize: 10, 
                            showSizeChanger: true, 
                            pageSizeOptions: [10], 
                            current: state.currentPage, 
                            // total: state.resultCount
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default LeadsView;
