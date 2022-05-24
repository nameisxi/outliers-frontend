import { Card, Typography, Row, Col, Statistic } from 'antd';
import { StarOutlined, ForkOutlined, TeamOutlined, EyeOutlined } from '@ant-design/icons';


const organizations = [
    {
    login: "EleutherAI",
    id: 68924597,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjY4OTI0NTk3",
    url: "https://api.github.com/orgs/EleutherAI",
    repos_url: "https://api.github.com/orgs/EleutherAI/repos",
    events_url: "https://api.github.com/orgs/EleutherAI/events",
    hooks_url: "https://api.github.com/orgs/EleutherAI/hooks",
    issues_url: "https://api.github.com/orgs/EleutherAI/issues",
    members_url: "https://api.github.com/orgs/EleutherAI/members{/member}",
    public_members_url: "https://api.github.com/orgs/EleutherAI/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/68924597?v=4",
    description: ""
    },
    {
    login: "jiphyeonjeon",
    id: 74055879,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjc0MDU1ODc5",
    url: "https://api.github.com/orgs/jiphyeonjeon",
    repos_url: "https://api.github.com/orgs/jiphyeonjeon/repos",
    events_url: "https://api.github.com/orgs/jiphyeonjeon/events",
    hooks_url: "https://api.github.com/orgs/jiphyeonjeon/hooks",
    issues_url: "https://api.github.com/orgs/jiphyeonjeon/issues",
    members_url: "https://api.github.com/orgs/jiphyeonjeon/members{/member}",
    public_members_url: "https://api.github.com/orgs/jiphyeonjeon/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/74055879?v=4",
    description: "자연어처리 리뷰 모임"
    },
    {
    login: "tunib-ai",
    id: 79139576,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjc5MTM5NTc2",
    url: "https://api.github.com/orgs/tunib-ai",
    repos_url: "https://api.github.com/orgs/tunib-ai/repos",
    events_url: "https://api.github.com/orgs/tunib-ai/events",
    hooks_url: "https://api.github.com/orgs/tunib-ai/hooks",
    issues_url: "https://api.github.com/orgs/tunib-ai/issues",
    members_url: "https://api.github.com/orgs/tunib-ai/members{/member}",
    public_members_url: "https://api.github.com/orgs/tunib-ai/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/79139576?v=4",
    description: "TUNiB Inc."
    },
    {
    login: "lassl",
    id: 79458188,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjc5NDU4MTg4",
    url: "https://api.github.com/orgs/lassl",
    repos_url: "https://api.github.com/orgs/lassl/repos",
    events_url: "https://api.github.com/orgs/lassl/events",
    hooks_url: "https://api.github.com/orgs/lassl/hooks",
    issues_url: "https://api.github.com/orgs/lassl/issues",
    members_url: "https://api.github.com/orgs/lassl/members{/member}",
    public_members_url: "https://api.github.com/orgs/lassl/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/79458188?v=4",
    description: ""
    },
    {
    login: "Hugging-Face-Supporter",
    id: 95871935,
    node_id: "O_kgDOBbbjvw",
    url: "https://api.github.com/orgs/Hugging-Face-Supporter",
    repos_url: "https://api.github.com/orgs/Hugging-Face-Supporter/repos",
    events_url: "https://api.github.com/orgs/Hugging-Face-Supporter/events",
    hooks_url: "https://api.github.com/orgs/Hugging-Face-Supporter/hooks",
    issues_url: "https://api.github.com/orgs/Hugging-Face-Supporter/issues",
    members_url: "https://api.github.com/orgs/Hugging-Face-Supporter/members{/member}",
    public_members_url: "https://api.github.com/orgs/Hugging-Face-Supporter/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/95871935?v=4",
    description: "Thank you for helping out Hugging Face!"
    }
];

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


function AccountDetails(props) {
    const dateToString = (date) => {
        date = date.split('-');
        return `${months[parseInt(date[1])]} ${date[0]}`
    };

    const organizationToComponent = (organization) => {
        return <img src={organization.avatar_url} height={32} width={32} style={{ borderRadius: 4, marginRight: 8 }} />;
    };

    return (
        <div>
            <Card>
            <Row>
                <Col span={12}>
                    <Statistic title="Joined GitHub" value={dateToString(props.githubAccount.github_account_created_at)} />
                </Col>
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
            </Row>
            <br/>
            
            <Row>
                <Col span={12}>
                    <Typography.Text type='secondary'>Organizations</Typography.Text>
                    <br/>
                    <div style={{ paddingTop: 8 }}>
                        { organizations.map((organization) => {
                            return organizationToComponent(organization);
                        })}
                    </div>
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
            <br/>
        </div>
    );
}

export default AccountDetails;
