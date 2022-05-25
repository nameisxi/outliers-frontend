import { Card, Row, Col, Statistic, Divider, Typography } from 'antd';
import { SubnodeOutlined, PullRequestOutlined, ExclamationCircleOutlined, IssuesCloseOutlined, PlusSquareOutlined } from '@ant-design/icons';

import ContributionCalendar from '../ContributionCalendar';


function ActivityDetails(props) {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider orientation='left'><Typography.Title level={4} style={{ margin: 0 }}>Activity</Typography.Title></Divider>
                    <Typography.Text type='primary'>Candidate's GitHub activity during the past year.</Typography.Text>
                </Col>
            </Row>
            <br/>

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
                                Contributions
                            </Typography.Text>
                        }
                        value={props.githubAccount.contributions_count} 
                        valueStyle={{ fontSize: 34 }}
                    />
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    <Typography.Text type='secondary'><SubnodeOutlined /> Commits:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    <Col span={6}></Col>
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    <Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    <Typography.Text type='secondary'><ExclamationCircleOutlined /> Issues Opened:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    <Typography.Text type='secondary'><PullRequestOutlined /> PRs Closed:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    <Typography.Text type='secondary'><IssuesCloseOutlined /> Issues Closed:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
            </Row>

            {/* <Row justify="space-evenly">
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6} style={{ minWidth: 100 }}>
                
                    <Typography.Text type='secondary'><ExclamationCircleOutlined /> Issues Opened:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    
                    <Typography.Text type='secondary'><IssuesCloseOutlined /> Issues Closed:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
            </Row> */}
            </Card>
            <br/>

            <Row>
                <Col span={24}>
                    <ContributionCalendar />
                </Col>
            </Row>
        </div>
    );
}

export default ActivityDetails;