import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, PageHeader, Spin, Steps } from 'antd';
import { UserOutlined, IdcardOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';

import JobOpeningCard from "./JobOpeningCard";
import TokenLoader from '../tokenLoader';
import getOpenings from './dataLoader';

const { Title, Text } = Typography;
const { Step } = Steps;


function HomeView() {
    const { token, setToken } = TokenLoader();
    const [openings, setOpenings] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/create-opening`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (!openings) {
            getOpenings(token, setOpenings, setLoading);
        }
    }, []);

    return (
        <div id="HomeView" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            <PageHeader 
                title={<Title level={2} style={{ marginBottom: 0 }}>Job Openings</Title>} 
                style={{ padding: 0 }} 
                extra={[
                    <Button 
                        type="primary" 
                        size="large"
                        icon={<PlusOutlined/>}
                        onClick={handleButtonClick}
                    >
                        New opening
                    </Button>
                  ]}
            />
            <br/>
            <br/>
            
            <Steps 
                style={{ 
                    maxWidth: '600px', 
                    paddingLeft: 24,
                    paddingRight: 24,
                    marginLeft: 'auto', 
                    marginRight: 'auto'
                }}>
                <Step status="process" title="Create opening" icon={<PlusOutlined />} />
                <Step status="process" title="Get leads" icon={<IdcardOutlined />} />
                <Step status="process" title="Interview" icon={<UserOutlined />} />
                {/* <Step status="finish" title="Hire" icon={<TeamOutlined />} /> */}
            </Steps>
            <br/>
            <br/>
            { loading || !openings ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                openings.map((opening) => {
                    return (
                        <div>
                            <JobOpeningCard 
                                id={opening.id} 
                                status={opening.status}
                                title={opening.title}
                                team={opening.team}
                                yearsOfExperience={opening.years_of_experience}
                                createdBy={opening['opening_created_by']['user']['email']}
                            />
                            <br/>
                        </div>
                    );
                })
            
            )}
            <br/>
        </div>
    );
}

export default HomeView;
