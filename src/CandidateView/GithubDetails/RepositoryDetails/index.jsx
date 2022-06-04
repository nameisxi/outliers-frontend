import { Card, Row, Col, Statistic, Typography } from 'antd';
import { SaveOutlined, ForkOutlined, FolderAddOutlined, FileAddOutlined, FileExcelOutlined, LockOutlined } from '@ant-design/icons';

import TopRepositoryDetails from '../TopRepositoryDetails';


function RepositoryDetails(props) {
    const topRepos = props.githubAccount.repos.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    }).slice(0,5);

    console.log(topRepos);

    return (         
        <div>
            <Card 
                bordered={false} 
                style={{ backgroundColor: 'transparent' }} 
                bodyStyle={{ 
                    paddingTop: 0, 
                    paddingLeft: 0, 
                    paddingRight: 0, 
                    paddingBottom: 8,
                }}
            >
                    <Typography.Title level={3} style={{ margin: 0 }}>Repositories</Typography.Title>
                    {/* <Typography.Text type='primary'>Candidate's Github repository statistics from the past 3 years.</Typography.Text> */}
            </Card>

            <Card style={{ borderRadius: 6 }} bodyStyle={{ paddingBottom: 8 }}>
                <Row justify="space-evenly" style={{ marginBottom: 16 }}>
                    <Col span={6}>
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
                    <Col span={6}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><SubnodeOutlined /> Commits</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><ForkOutlined /> Forked Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><SaveOutlined /> Combined Size:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><LockOutlined /> Private Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><FileAddOutlined /> Insertions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={6}>
                        {/* <Statistic 
                            title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text>}
                            value={'TODO'} 
                        /> */}
                        <Typography.Text type='secondary'><FolderAddOutlined /> Contributed Repos:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                        <Typography.Text type='secondary'><FileExcelOutlined /> Deletions:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                </Row>

                <TopRepositoryDetails topRepos={topRepos} />

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
        </div>
    );
}

export default RepositoryDetails;
