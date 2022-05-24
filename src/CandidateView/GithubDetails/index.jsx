import { useState, useEffect } from 'react';
import { Divider, Typography, Row, Col, Statistic, Spin, Tag } from 'antd';

import AccountDetails from './AccountDetails';
import ActivityDetails from './ActivityDetails';
import ProjectDetails from './ProjectDetails';
import TokenLoader from '../../tokenLoader';
import getGithubAccount from './dataLoader';

const { Title, Text } = Typography;


function GithubDetails(props) {
    const [githubAccount, setGithubAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = TokenLoader();

    useEffect(() => {
        if (!githubAccount) {
            getGithubAccount(token, props.candidate.id, setGithubAccount, setLoading);
        }
    }, []);

    return (
        <div>     
            {loading || !githubAccount ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>       
                    <br/>
                    <AccountDetails githubAccount={githubAccount} />

                    <ActivityDetails githubAccount={githubAccount} />
                    <ProjectDetails githubAccount={githubAccount} />

                    <br/>
                    <Text>Github profile URL: <a href={githubAccount.profile_html_url}>{githubAccount.profile_html_url}</a></Text>
                </div>
            )}
        </div>
    );
}

export default GithubDetails;
