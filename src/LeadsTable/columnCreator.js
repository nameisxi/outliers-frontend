import { Tag, Card, Row, Col, Typography } from 'antd';
import { Area } from '@ant-design/plots';


function createPercentageChart(languages, filters) {
    let data = []
    const currentYear = new Date().getFullYear();

    const sortedLanguages = languages.sort((a, b) => {
        return b['language_share'] - a['language_share'];
    });

    
    sortedLanguages.filter((language) => filters.includes(language.language.name)).forEach((language) => {
        data.push(
            {
                'year': `${currentYear - 2}`,
                'value': language.language_share_third_year,
                'language': language.language.name.toUpperCase(),
            }
        );
        data.push(
            {
                'year': `${currentYear - 1}`,
                'value': language.language_share_second_year,
                'language': language.language.name.toUpperCase(),
            }
        );
        data.push(
            {
                'year': `${currentYear}`,
                'value': language.language_share_current_year,
                'language': language.language.name.toUpperCase(),
            }
        );
    });

    let language_share_third_year_others = 0;
    let language_share_second_year_others = 0;
    let language_share_current_year_others = 0;

    sortedLanguages.filter((language) => language.language_share >= 0.01 && !filters.includes(language.language.name)).forEach((language) => {
        language_share_third_year_others += language.language_share_third_year;
        language_share_second_year_others += language.language_share_second_year;
        language_share_current_year_others += language.language_share_current_year;
    });

    data.push(
        {
            'year': `${currentYear - 2}`,
            'value': language_share_third_year_others,
            'language': 'OTHER',
        }
    );
    data.push(
        {
            'year': `${currentYear - 1}`,
            'value': language_share_second_year_others,
            'language': 'OTHER',
        }
    );
    data.push(
        {
            'year': `${currentYear}`,
            'value': language_share_current_year_others,
            'language': 'OTHER',
        }
    );

    const config = {
        data,
        smooth: true,
        height: 100,
        width: 600,
        autoFit: false,
        xField: 'year',
        yField: 'value',
        seriesField: 'language',
        color: (seriesField) => {
            if (seriesField.language === 'OTHER') {
                return '#f0f0f0';
            }

            const languageObject = sortedLanguages.filter((language) => language.language.name.toUpperCase() === seriesField.language)[0];
            return languageObject.language.color;
        },
        pattern: (type, color) => {
            if (type.language === 'OTHER') {
                return { 
                    type: 'line',
                    cfg: {
                        backgroundColor: color,
                    }
                };
            }
        },
        areaStyle: {
            fillOpacity: 0.7,
        },
        isPercent: true,
        yAxis: {
            grid: null,
            label: null,
        },
        // xAxis: {
        //     label: null,
        //     line: null,
        // },
        xAxis: {
            label: {
                // text: 'Number of Active Repositories',
                offset: -2,
                formatter: (text, item, index) => {
                    if (index == 0) {
                        text = `           ${text}`;
                    }
    
                    if (index == 2) {
                        text = `${text}           `;
                    }

                    return (text);
                },
                style: {
                    fill: '#434343',
                },
            },
            line: null,
            tickLine: null,
            
        },
        legend: false,
    };
    
    return (
        <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', overflowX: 'hidden', overflowY: 'visible', borderRadius: 4 }}>
            <Area 
                {...config} 
                style={{ 
                    justifyContent: 'center',
                    display: 'flex',
                    marginLeft: 'auto', 
                    marginRight: 'auto' 
                }}/>
        </div>
    );
}

function setTags(tags, fieldName, secondaryFieldName, filters){
    const tagComponents = [];

    const sortedTags = tags.sort((a, b) => {
        // return b[`${fieldName}_share`] - a[`${fieldName}_share`];
        return b[secondaryFieldName] - a[secondaryFieldName];
    });

    sortedTags.slice(0, 5).filter((tag) => tag[secondaryFieldName] >= 0.01).forEach((tag) => {
        const tagName = tag[fieldName]['name'];
        const tagShare = tag[secondaryFieldName];

        tagComponents.push(
            <Tag 
                key={tagName}
                // icon={
                //     <img 
                //         src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tagName}/${tagName}-plain.svg`} 
                //         height={15}
                //         width={15}
                //         style={{ verticalAlign: 'center' }}
                //     />
                // }
                // color={filters && filters.includes(tagName) ? "blue" : "red"}
                // style={{
                //     height: 30,
                //     verticalAlign: 'center'
                // }}
                color={filters && filters.includes(tagName) ? 'blue' : null}
            >
                {/* &nbsp; */}
                { `${tagName.toUpperCase()} (${Math.round(tagShare * 100)}%)` }
            </Tag>
        );
    });

    return tagComponents;
}

function createColumns(setColumns, filters) {
    const columns = [
        { 
            title: 'Ranking', 
            dataIndex: 'work_score', 
            key: 'work_score',
            // render: score => roundScore(score),
            render: (value, item, index) => index + 1,
        },
        { 
            title: 'Location', 
            dataIndex: 'location', 
            key: 'location' 
        },
        { 
            title: 'Employer', 
            dataIndex: 'employer', 
            key: 'employer' 
        },
        { 
            title: 'Most used languages (% of all code)', 
            dataIndex: ['github_accounts', '0', 'programming_languages'], 
            key: 'programming_languages_shares',
            render: languages => {
                return (
                    <div>
                        <Row>
                            <Col>
                                {setTags(languages, 'language', 'language_share', filters.languages)}
                            </Col>
                        </Row>
                    </div>
                );
                
            },
        },
        { 
            title: 'Most used languages (% of active repositories)', 
            dataIndex: ['github_accounts', '0', 'programming_languages'], 
            key: 'programming_languages_yearly_shares',
            render: languages => createPercentageChart(languages, filters.languages),
        },
        // {
        //     title: 'Most used languages',
        //     children: [
        //         { 
        //             title: '(% of all bytes for the account)', 
        //             dataIndex: ['github_accounts', '0', 'programming_languages'], 
        //             key: 'language_share',
        //             render: languages =>  setTags(languages, 'language', 'language_share', filters.languages),
                    
        //         },
        //         { 
        //             title: '(% of active repos in 2022)', 
        //             dataIndex: ['github_accounts', '0', 'programming_languages'], 
        //             key: 'language_share_current_year',
        //             render: languages => setTags(languages, 'language', 'language_share_current_year', filters.languages),
        //         },
        //         { 
        //             title: '(% of active repos in 2021)', 
        //             dataIndex: ['github_accounts', '0', 'programming_languages'], 
        //             key: 'language_share_second_year',
        //             render: languages => setTags(languages, 'language', 'language_share_second_year', filters.languages),
        //         },
        //         { 
        //             title: '(% of active repos in 2020)', 
        //             dataIndex: ['github_accounts', '0', 'programming_languages'], 
        //             key: 'language_share_third_year',
        //             render: languages => setTags(languages, 'language', 'language_share_third_year', filters.languages),
        //         },
        //     ],
        // },
        // { 
        //     title: 'Technologies', 
        //     dataIndex: ['github_accounts', '0', 'technologies'], 
        //     key: 'technologies',
        //     render: technologies => setTags(technologies, 'technology'),
        // },
        { 
            title: 'Most used topics & technologies (last 3 years)', 
            dataIndex: ['github_accounts', '0', 'topics'], 
            key: 'topics',
            render: topics => setTags(topics, 'topic', 'topic_share', filters.topics),
        },
        // { 
        //     title: 'Github', 
        //     dataIndex: 'github_url', 
        //     key: 'github_url',
        //     render: url => <a href={url}>{url}</a>,
        // },
        // { 
        //     title: 'Linkedin', 
        //     dataIndex: 'linkedin_url', 
        //     key: 'linkedin_url' 
        // },
        // { 
        //     title: 'Website', 
        //     dataIndex: 'website_url', 
        //     key: 'website_url' 
        // },
        // { 
        //     title: 'Email', 
        //     dataIndex: 'email', 
        //     key: 'email' 
        // },
    ];

    setColumns(columns);
}

export default createColumns;