import { Typography, Row, Col } from 'antd';
import { Line } from '@ant-design/plots';

import { LineChartOutlined } from '@ant-design/icons';


const COLOR_PALETTE = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
];


function getProgrammingLanguageData(repos, uniqueLanguages) {
    let data = [];
    const range = 12 * 3 * uniqueLanguages.length; // 12 months * 3 years * one data point per language.
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // this value is actually previous month, e.g. the latest full month.
    
    let year = new Date().getFullYear();
    const months = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'];
    
    while (data.length < range) {
        months.forEach((month) => {
            if ((year === currentYear && month > currentMonth) || data.length === range) {
                return;
            }

            uniqueLanguages.forEach((language) => {
                data.push({
                    created_at: `${year}-${month}`,
                    language: language.toUpperCase(),
                    value: null,
                });
            });

    
        });
        year -= 1;
    }

    data = data.reverse(); // Without a reverse the x axis would be going back in time.

    const previousValues = {};
    uniqueLanguages.forEach((language) => {
        previousValues[language] = 0;
    });

    const sortedRepos = repos.sort((a, b) => {
        if (a.repo_created_at < b.repo_created_at) {
            return -1;
        }
        if (a.repo_created_at > b.repo_created_at) {
            return 1;
        }
        return 0;
    });

    // data.forEach((dataPoint) => {
    //     sortedRepos.forEach((repo) => {
    //         if (repo.repo_created_at.substring(0, 7) >= data[0].created_at) return;

    //         repo.programming_languages.forEach((language) => {
    //             previousValues[language.language.name] += 1;
    //             dataPoint.value = previousValues[language.language.name];
    //         });
    //     });
    // });

    const createdAtCountedRepos = new Set();
    const pushedAtCountedRepos = new Set();

    const activeRepos = new Set();

    data.forEach((dataPoint) => {
        sortedRepos.forEach((repo) => {
            repo.programming_languages.forEach((language) => {
                    if (language.language.name.toUpperCase() === dataPoint.language) {
                        if (repo.repo_created_at.substring(0, 7) < data[0].created_at && !createdAtCountedRepos.has(repo.id)) {
                            previousValues[language.language.name] += 1;
                            createdAtCountedRepos.add(repo.id);
                        }
                        if (repo.pushed_at.substring(0, 7) < data[0].created_at && !pushedAtCountedRepos.has(repo.id)) {
                            previousValues[language.language.name] -= 1;
                            pushedAtCountedRepos.add(repo.id);
                            // dataPoint.value = previousValues[language.language.name];
                        }


                        if (repo.repo_created_at.substring(0, 7) === dataPoint.created_at && !activeRepos.has(repo.id)) {
                            previousValues[language.language.name] += 1;
                            dataPoint.value = previousValues[language.language.name];
                            activeRepos.add(repo.id);
                        } 
                        
                        if (repo.pushed_at.substring(0, 7) === dataPoint.created_at && activeRepos.has(repo.id)) {
                            previousValues[language.language.name] -= 1;
                            dataPoint.value = previousValues[language.language.name];
                            activeRepos.delete(repo.id);
                        }
                        
                        // if (dataPoint.value === null && repo.repo_created_at.substring(0, 7) < dataPoint.created_at && repo.pushed_at.substring(0, 7) > dataPoint.created_at) {
                        if (dataPoint.value === null) {
                            dataPoint.value = previousValues[language.language.name];
                        }
                    }
            });
        });
    });

    return data;
}

function ProgrammingLanguageUsage(props) {
    // const topLanguages = props.languages.filter((language) => language.language_share >= 0.1);
    const topLanguages = props.languages.slice(0, 5);
    const languageNames = [...topLanguages.map((language) => language.language.name)];
    
    const data = getProgrammingLanguageData(props.repos, languageNames);
    const config = {
        data,
        xField: 'created_at',
        yField: 'value',
        seriesField: 'language',
        yAxis: {
            title: {
                text: 'Number of Active Repositories',
            },
        },
        connectNulls: false,
        smooth: true,
        color: COLOR_PALETTE,
        
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Typography.Text type='secondary'><LineChartOutlined /> Most Used Programming Languages Usage Trends</Typography.Text>
                </Col>
            </Row>
            <br/>
            <Line {...config} />
        </div>
    );
}

export default ProgrammingLanguageUsage;