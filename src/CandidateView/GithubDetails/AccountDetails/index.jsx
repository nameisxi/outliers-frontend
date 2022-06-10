import { Card, Typography, Row, Col, Statistic, Tooltip } from 'antd';
import { GithubOutlined, StarOutlined, ForkOutlined, TeamOutlined, EyeOutlined } from '@ant-design/icons';


const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


function AccountDetails(props) {
    const dateToString = (date) => {
        date = date.split('-');
        return `${months[parseInt(date[1])-1]} ${date[0]}`
    };

    const organizationToComponent = (organization) => {
        return (
            <Tooltip placement="top" title={organization.name.toUpperCase()}>
                <img src={organization.avatar_url} height={32} width={32} style={{ borderRadius: 4, marginRight: 8 }} />
            </Tooltip>
        );
    };

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
                <Typography.Title level={3} style={{ margin: 0 }}>Github Account</Typography.Title>
                {/* <Typography.Text type='primary'>Candidate's Github profile statistics.</Typography.Text> */}
            </Card>

            <Card style={{ borderRadius: 6 }}>
                <Row>
                    <Col span={12}>
                        <Statistic title="Joined GitHub" value={dateToString(props.githubAccount.account_created_at)} />
                    </Col>
                    <Col span={12}>
                        <Typography.Text type='secondary'>Organizations</Typography.Text>
                        <br/>
                        <div style={{ paddingTop: 8 }}>
                            { props.githubAccount.organizations.map((organization) => {
                                return organizationToComponent(organization);
                            })}
                        </div>
                    </Col>
                    
                </Row>
                <br/>
                
                <Row justify='space-evenly'>
                    <Col span={6}>
                        <Statistic 
                            title={<Typography.Text type='secondary'><StarOutlined /> Stargazers</Typography.Text>}
                            value={props.githubAccount.stargazers} 
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic 
                            title={<Typography.Text type='secondary'><ForkOutlined /> Forkers</Typography.Text>}
                            value={props.githubAccount.forkers} 
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title={<Typography.Text type='secondary'><EyeOutlined /> Watchers</Typography.Text>}
                            value={props.githubAccount.watchers} 
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic 
                            title={<Typography.Text type='secondary'><TeamOutlined /> Followers</Typography.Text>}
                            value={props.githubAccount.followers_count} 
                        />
                    </Col>
                </Row>
            </Card>

            {/* <br/>
            <br/>
            <Row>
                <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Stargazers" value={props.githubAccount.stargazers} />
                </Col>
                <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Forkers" value={props.githubAccount.forkers} />
                </Col>
                <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Watchers" value={props.githubAccount.watchers} />
                </Col>

                <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Followers" value={props.githubAccount.followers_count} />
                </Col> */}
                {/* <Col span={4} style={{ minWidth: 100 }}>
                    <Statistic title="Following" value={props.githubAccount.following_count} />
                </Col> */}
            {/* </Row> */}
        </div>
    );
}

export default AccountDetails;
