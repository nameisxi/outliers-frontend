import { useState, useEffect } from 'react';
import { Typography, Spin, Row, Col } from 'antd';

import AccountDetails from './AccountDetails';
import ActivityDetails from './ActivityDetails';
import TopRepositoryDetails from './TopRepositoryDetails';
import RepositoryDetails from './RepositoryDetails';
import SkillDetails from './SkillDetails';
import ProgrammingLanguageDetails from './ProgrammingLanguageDetails';
import TopicDetails from './TopicDetails';
import TokenLoader from '../../tokenLoader';
import getGithubAccount from './dataLoader';

const { Title, Text } = Typography;


function GithubDetails(props) {
    const [githubAccount, setGithubAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = TokenLoader();

    useEffect(() => {
        if (!githubAccount) {
            getGithubAccount(token, setToken, props.candidate.id, setGithubAccount, setLoading);
        }
    }, []);

    return (
        <div>     
            {loading || !githubAccount ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>                   
                    <Row gutter={[16,16]} type="flex" style={{ marginTop: 16, marginBottom: 16 }}>
                        <Col 
                            xs={24}
                            sm={24}
                            md={12}
                        >
                            <AccountDetails githubAccount={githubAccount} />
                            <p style={{ marginBottom: 16 + 16 }}></p>
                            <RepositoryDetails githubAccount={githubAccount} />
                        </Col>
                        <Col 
                            xs={24}
                            sm={24}
                            md={12}
                        >
                            <ActivityDetails githubAccount={githubAccount} />
                        </Col>
                    </Row>

                    <Row gutter={[16,16]} style={{ marginTop: 16 + 16 + 16 }}>
                        <Col span={24}>
                            <SkillDetails githubAccount={githubAccount} />
                        </Col>
                        {/* <Col span={12}>
                            <TopicDetails githubAccount={githubAccount}/>
                        </Col>
                        <Col span={12}>
                            <ProgrammingLanguageDetails githubAccount={githubAccount} />
                        </Col> */}
                    </Row>

                    <Text>Github profile URL: <a href={githubAccount.profile_html_url}>{githubAccount.profile_html_url}</a></Text>
                </div>
            )}
        </div>
    );
}

export default GithubDetails;
