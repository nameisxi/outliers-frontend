import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs, Divider } from 'antd';

import TokenLoader from '../tokenLoader';
import CareerDetails from './CareerDetails';
import GithubDetails from './GithubDetails';
import ContactDetails from './ContactDetails';
import getCandidate from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function CandidateView() {
    const { candidateId, openingId } = useParams();
    const { token, setToken } = TokenLoader();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!candidate) {
            getCandidate(token, setToken, candidateId, setCandidate, setLoading);
        }
    }, []);

    const handleGoBack = () => {
        if (openingId) {
            return navigate(`/openings/${openingId}`, { state: { from: location } });
        }

        navigate(-1);
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            {loading || !candidate ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <PageHeader 
                        title={<Title level={2} style={{ margin: 0 }}>Candidate {candidateId}</Title>}
                        onBack={handleGoBack}
                        style={{ 
                            padding: 24,
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 6,
                            borderTopRightRadius: 6,
                        }}
                    />

                    <Tabs 
                        size='large'
                        defaultActiveKey="opensource"
                        tabBarStyle={{
                            backgroundColor: '#fff',
                            borderBottomLeftRadius: 6,
                            borderBottomRightRadius: 6,
                            paddingLeft: 24,
                            paddingRight: 24,
                        }}
                    >
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
