import { Card, Row, Col, Statistic, Divider, Typography } from 'antd';
import { SubnodeOutlined, PullRequestOutlined, ExclamationCircleOutlined, IssuesCloseOutlined, PlusSquareOutlined } from '@ant-design/icons';

import ContributionCalendar from './ContributionCalendar';


function ActivityDetails(props) {
    return (
        <div style={{ height: 630 }}>
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
                <Typography.Title level={3} style={{ margin: 0 }}>Activity</Typography.Title>
                {/* <Typography.Text type='primary'>Candidate's Github activity during the past year.</Typography.Text> */}
            </Card>

            <Card style={{ borderRadius: 6, height: 590 }}>
                <Row>
                    <Col span={8}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    // style={{ 
                                    //     fontSize: 20, 
                                    // }}
                                >
                                    Contributions
                                </Typography.Text>
                            }
                            value={props.githubAccount.contributions_count} 
                            // valueStyle={{ fontSize: 34 }}
                        />
                    </Col>
                    
                    <Col span={8}>
                        <Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={8}>
                        <Typography.Text type='secondary'><ExclamationCircleOutlined /> Issues Opened</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col span={8}>
                        <Statistic 
                                title={<Typography.Text type='secondary'><SubnodeOutlined /> Commits</Typography.Text>}
                                value={'TODO'} 
                        />
                    </Col>
                    <Col span={8}>
                        <Typography.Text type='secondary'><PullRequestOutlined /> PRs Closed</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                    <Col span={8}>
                        <Typography.Text type='secondary'><IssuesCloseOutlined /> Issues Closed</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <ContributionCalendar githubAccount={props.githubAccount} />
                    </Col>
                </Row>

                {/* <p style={{ marginBottom: -(16 + 16 + 16 + 16 + 6) }}></p> */}
            </Card>
        </div>
    );
}

export default ActivityDetails;