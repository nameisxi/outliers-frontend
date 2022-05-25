import { Card, Row, Col, Statistic, Divider, Typography, Tag } from 'antd';
import { FolderOutlined, SaveOutlined, ForkOutlined, FolderAddOutlined, FileAddOutlined, FileExcelOutlined, LockOutlined, CodeOutlined, ToolOutlined } from '@ant-design/icons';

import ProgrammingLanguageUsage from '../ProgrammingLanguageUsage';


function ProjectDetails(props) {
    const bytesToMegabytes = (bytes) => {
        const MB = bytes / (1024 * 1024);
        return Math.round((MB + Number.EPSILON) * 100) / 100;
    };

    const setTags = (tags, fieldName) => {
        const tagComponents = [];
    
        const sortedTags = tags.sort((a, b) => {
            return b[`${fieldName}_share`] - a[`${fieldName}_share`];
        });
    
        // sortedTags.filter((tag) => tag[`${fieldName}_share`] >= 0.01).forEach((tag) => {
        sortedTags.slice(0, 5).forEach((tag) => {
            const tagName = tag[fieldName]['name'];
            const tagShare = tag[`${fieldName}_share`]

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
                    color='blue'
                    style={{ marginBottom: 8, marginTop: 8, }}
                >
                    {/* &nbsp; */}
                    { `${tagName.toUpperCase()} (${Math.round(tagShare * 100)}%)` }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    return (
        <div>
            <Card bordered={false}>
                <Typography.Title level={3} style={{ margin: 0 }}>Projects</Typography.Title>
                <Typography.Text type='primary'>Candidate's projects from the last 3 years.</Typography.Text>
            </Card>
            {/* <Row>
                <Col span={24}>
                    
                </Col>
            </Row>
            <br/> */}

            <Card>
                <Row justify="space-evenly">
                    <Col span={6} style={{ minWidth: 140 }}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 20, 
                                    }}
                                >
                                    Repositories
                                </Typography.Text>
                            }
                            value={props.githubAccount.repos.length} 
                            valueStyle={{ fontSize: 34 }}
                        />
                    </Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><SubnodeOutlined /> Commits</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><ForkOutlined /> Forked Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><SaveOutlined /> Combined Size:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><LockOutlined /> Private Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><FileAddOutlined /> Insertions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><FolderAddOutlined /> Contributed Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><FileExcelOutlined /> Deletions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                </Row>

                {/* <Row justify="space-evenly">
                    <Col span={6}></Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        <Typography.Text type='secondary'><SaveOutlined /> Combined Size:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        <Typography.Text type='secondary'><FileAddOutlined /> Insertions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6} style={{ minWidth: 100 }}>
                        <Typography.Text type='secondary'><FileExcelOutlined /> Deletions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                </Row> */}
            </Card>
            <br/>
            <br/>
            
            <Card>
                <Row>
                    <Col span={6} style={{ minWidth: 140 }}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 20, 
                                    }}
                                >
                                    Languages
                                </Typography.Text>
                            }
                            value={props.githubAccount.programming_languages.length} 
                            valueStyle={{ fontSize: 34 }}
                        />
                    </Col>
                    <Col span={18} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'><CodeOutlined /> Most Used Programming Languages</Typography.Text>
                        <br/>
                        {setTags(props.githubAccount.programming_languages, 'language')}
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col span={24}>
                        <ProgrammingLanguageUsage repos={props.githubAccount.repos} languages={props.githubAccount.programming_languages} />
                    </Col>
                </Row>
            </Card>
            <br/>
            <br/>
            
            <Card>
                <Row>
                    <Col span={6} style={{ minWidth: 140 }}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 20, 
                                    }}
                                >
                                    Topics & Technologies
                                </Typography.Text>
                            }
                            value={props.githubAccount.topics.length} 
                            valueStyle={{ fontSize: 34 }}
                    />
                    </Col>
                    <Col span={18} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'><ToolOutlined /> Most Used Topics & Technologies</Typography.Text>
                        <br/>
                        { props.githubAccount.topics.length > 0 ? (
                            setTags(props.githubAccount.topics, 'topic')
                        ) : (
                            <Typography.Text type='primary'>No topics or technologies found.</Typography.Text>    
                        )}
                        
                    </Col>
                    <Col span={24} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'>Latest Projects</Typography.Text>
                        <p>TODO</p>
                    </Col>
                    <Col span={24} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'>Top Projects</Typography.Text>
                        <p>TODO</p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProjectDetails;