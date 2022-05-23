import { useState, useEffect } from 'react';
import { Divider, Typography, Row, Col, Statistic, Spin, Tag } from 'antd';

import ContributionCalendar from './ContributionCalendar';
import TokenLoader from '../../tokenLoader';
import getGithubAccount from './dataLoader';

const { Title, Text } = Typography;

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

function GithubDetails(props) {
    const [githubAccount, setGithubAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = TokenLoader();

    useEffect(() => {
        if (!githubAccount) {
            getGithubAccount(token, props.candidate.id, setGithubAccount, setLoading);
        }
    }, []);

    const organizationToComponent = (organization) => {
        return <img src={organization.avatar_url} height={32} width={32} style={{ borderRadius: 4, marginRight: 8 }} />;
    };

    const bytesToMegabytes = (bytes) => {
        const MB = bytes / (1024 * 1024);
        return Math.round((MB + Number.EPSILON) * 100) / 100;
    };

    const setTags = (tags, fieldName) => {
        const tagComponents = [];
    
        const sortedTags = tags.sort((a, b) => {
            return b[`${fieldName}_share`] - a[`${fieldName}_share`];
        });
    
        sortedTags.filter((tag) => tag[`${fieldName}_share`] >= 0.01).forEach((tag) => {
            const tagName = tag[fieldName]['name'];
            const tagShare = tag[`${fieldName}_share`]
            
            console.log(tagName);

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
                    style={{ marginBottom: 8 }}
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
            {loading || !githubAccount ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>       
                    <br/>
                    <Row>
                        <Col span={8}>
                            <Statistic title="Joined GitHub" value={githubAccount.github_account_created_at} />
                        </Col>
                        <Col span={12}>
                            <Text type='secondary'>Organizations</Text>
                            <br/>
                            <div style={{ paddingTop: 8 }}>
                                { organizations.map((organization) => {
                                    return organizationToComponent(organization);
                                })}
                            </div>
                            
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Stargazers" value={githubAccount.stargazers} />
                        </Col>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Forkers" value={githubAccount.forkers} />
                        </Col>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Watchers" value={githubAccount.watchers} />
                        </Col>

                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Followers" value={githubAccount.followers_count} />
                        </Col>
                        {/* <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Following" value={githubAccount.following_count} />
                        </Col> */}
                    </Row>
                    <br/>

                    <Row>
                        <Col span={24}>
                            <Divider orientation='left'><Title level={4} style={{ margin: 0 }}>Activity</Title></Divider>
                            <Text type='primary'>Activity of the user during the past year.</Text>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Contributions" value={githubAccount.contributions_count} />
                        </Col>

                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Commits" value={'TODO'} />
                        </Col>

                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="PRs Opened" value={'TODO'} />
                        </Col>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="PRs Reviewed" value={'TODO'} />
                        </Col>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Issues Opened" value={'TODO'} />
                        </Col>
                        <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Issues Closed" value={'TODO'} />
                        </Col>
                        {/* <Col span={4} style={{ minWidth: 100 }}>
                            <Statistic title="Issue Comments" value={'TODO'} />
                        </Col> */}
                    </Row>
                    <br/>
                    <Row>
                        {/* <Col span={24}>
                            <img src='https://raw.githubusercontent.com/lowlighter/metrics/088b8669eca13d0ea882f9e01b2a25ac369c353b/metrics.plugin.isocalendar.fullyear.svg' height={445} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}></img>
                        </Col> */}
                        <Col span={24}>
                            <ContributionCalendar />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Divider orientation='left'><Title level={4}>Projects</Title></Divider>
                        </Col>
                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Repositories" value={githubAccount.repos_count} />
                        </Col>
                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Forked Repositories" value={'TODO'} />
                        </Col>
                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Contributed Repositories" value={'TODO'} />
                        </Col>

                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Combined Size" value={`${bytesToMegabytes(githubAccount.combinedSize)} MB`} />
                        </Col>
                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Codebase Additions" value={'TODO'} />
                        </Col>
                        <Col span={8} style={{ minWidth: 100 }}>
                            <Statistic title="Codebase Removals" value={'TODO'} />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={24} style={{ paddingBottom: 8 }}>
                            <Text type='secondary'>Most Used Programming Languages</Text>
                            <br/>
                            {setTags(githubAccount.programming_languages, 'language')}
                        </Col>
                        <Col span={24} style={{ paddingBottom: 8 }}>
                            <Text type='secondary'>Recently Used Programming Languages</Text>
                            <p>TODO</p>
                        </Col>
                        <Col span={24} style={{ paddingBottom: 8 }}>
                            <Text type='secondary'>Topics & Technologies</Text>
                            <br/>
                            {setTags(githubAccount.topics, 'topic')}
                        </Col>
                        <Col span={24} style={{ paddingBottom: 8 }}>
                            <Text type='secondary'>Latest Projects</Text>
                            <p>TODO</p>
                        </Col>
                        <Col span={24} style={{ paddingBottom: 8 }}>
                            <Text type='secondary'>Top Projects</Text>
                            <p>TODO</p>
                        </Col>
                    </Row>
                    <br/>
                    <Text>Github profile URL: <a href={githubAccount.profile_html_url}>{githubAccount.profile_html_url}</a></Text>
                </div>
            )}
        </div>
    );
}

export default GithubDetails;
