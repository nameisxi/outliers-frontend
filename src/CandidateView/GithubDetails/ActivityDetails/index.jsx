import { Card, Row, Col, Statistic, Divider, Typography } from 'antd';
import { SubnodeOutlined, PullRequestOutlined, ExclamationCircleOutlined, IssuesCloseOutlined, PlusSquareOutlined } from '@ant-design/icons';

import ContributionCalendar from './ContributionCalendar';
import CardTitle from '../../../CardTitle';


function ActivityDetails(props) {
    return (
        <div style={{ height: 'calc(100% - 40.4px)', minHeight: 450 }}>
            <CardTitle title='Activity' />

            <Card 
                style={{ 
                    borderRadius: 6, 
                    height: '100%',
                }}
                bodyStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Row>
                    <Col span={8}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                >
                                    Contributions
                                </Typography.Text>
                            }
                            value={props.githubAccount.contributions_count} 
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

                {/* <p style={{ marginBottom: 24 + 1 + 16 + 16 }}></p>
                <div style={{ visibility: 'hidden'}}>
                    <CardTitle title='Repositories' />
                </div> */}
                
                <Row 
                    // style={{ position: 'absolute', bottom: 100 }}
                    style={{ flexGrow: 1 }}
                >
                    <Col span={24}>
                        <ContributionCalendar githubAccount={props.githubAccount} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ActivityDetails;