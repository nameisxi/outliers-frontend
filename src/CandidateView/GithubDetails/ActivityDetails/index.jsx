import { Card, Row, Col, Statistic, Divider, Typography } from 'antd';
import { SubnodeOutlined, PullRequestOutlined, ExclamationCircleOutlined, IssuesCloseOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

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
                <Col span={6} style={{ minWidth: 100 }}>
                    <Statistic
                        title={<Typography.Text type='secondary'>Contributions</Typography.Text>}
                        value={props.githubAccount.contributions_count} 
                    />
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    {/* <Statistic 
                        title={<Typography.Text type='secondary'><SubnodeOutlined /> Commits</Typography.Text>}
                        value={'TODO'} 
                    /> */}
                    <Typography.Text type='secondary'><SubnodeOutlined /> Commits:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                    
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    {/* <Statistic 
                        title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened</Typography.Text>}
                        value={'TODO'} 
                    /> */}
                    <Typography.Text type='secondary'><PullRequestOutlined /> PRs Opened:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    {/* <Statistic 
                        title={<Typography.Text type='secondary'><PullRequestOutlined /> PRs Closed</Typography.Text>}
                        value={'TODO'} 
                    /> */}
                    <Typography.Text type='secondary'><PullRequestOutlined /> PRs Closed:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
            </Row>

            <Row justify="space-evenly">
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    {/* <Statistic title="Issues Opened" value={'TODO'} /> */}
                    <Typography.Text type='secondary'><ExclamationCircleOutlined /> Issues Opened:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
                <Col span={6} style={{ minWidth: 100 }}>
                    {/* <Statistic title="Issues Closed" value={'TODO'} /> */}
                    <Typography.Text type='secondary'><IssuesCloseOutlined /> Issues Closed:</Typography.Text><p style={{ margin: 0 }}>TODO</p>
                </Col>
                {/* <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Issue Comments" value={'TODO'} />
                </Col> */}
            </Row>
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