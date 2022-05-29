import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs, Divider } from 'antd';

import TokenLoader from '../tokenLoader';
import CareerDetails from './CareerDetails';
import GithubDetails from './GithubDetails';
import ContactDetails from './ContactDetails';
import getCandidate from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function CandidateView() {
    const { token, setToken } = TokenLoader();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(false);
    const { candidateId } = useParams();

    useEffect(() => {
        if (!candidate) {
            getCandidate(token, candidateId, setCandidate, setLoading);
            console.log(candidate);
        }
    }, []);

    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            {loading || !candidate ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <PageHeader 
                        title={<Title level={2} style={{ margin: 0 }}>Candidate {candidateId}</Title>}
                        style={{ padding: 0 }}
                    />
                    <br/>

                    <Tabs defaultActiveKey="opensource">
                        <TabPane tab="Opensource" key="opensource">
                            <GithubDetails candidate={candidate} />
                        </TabPane>
                        <TabPane tab="Career & Education" key="career" disabled>
                            <CareerDetails candidate={candidate} />
                        </TabPane>
                        <TabPane tab="Contact" key="contact" disabled>
                            <ContactDetails candidate={candidate} />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            
        </div>
    );
}

export default CandidateView;
