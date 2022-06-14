import { Typography, Row, Col, Card } from 'antd';
import { Line, Area } from '@ant-design/plots';

import { LineChartOutlined } from '@ant-design/icons';


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
                text: 'Number of Repositories',
                offset: 32,
            },
        },
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        },
        connectNulls: false,
        smooth: true,
        // color: COLOR_PALETTE,
        color: (seriesField) => {
            // console.log("FIELD:", seriesField);
            const languageObject = props.languages.filter((language) => language.language.name.toUpperCase() === seriesField.language)[0];
            return languageObject.language.color;
        },
        
    };

    return (
        <Card style={{ borderRadius: 6 }}>
            <Row gutter={[16,16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary' style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: 20 }}>Language Trends in Candidate's Repositories</Typography.Text>
                </Col>
                <Col span={24}>
                    <Area {...config} style={{ paddingTop: 8, marginLeft: -18, paddingRight: 16, paddingLeft: 16 }} />
                </Col>
            </Row>
            
        </Card>
    );
}

export default ProgrammingLanguageUsage;