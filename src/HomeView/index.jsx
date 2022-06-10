import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, PageHeader, Spin, Steps, Row, Col } from 'antd';
import { UserOutlined, IdcardOutlined, PlusOutlined } from '@ant-design/icons';

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
        <div id="HomeView" style={{ paddingLeft: 24, paddingRight: 24}}>
            <div 
                style={{ 
                    padding: 24,
                    borderRadius: 6, 
                    backgroundColor: '#fff',
                    marginBottom: 24,
                }}>
                <PageHeader 
                    title={<Title level={2} style={{ margin: 0 }}>Job Openings</Title>} 
                    extra={[
                        <Button 
                            key="new-opening-button"
                            type="primary" 
                            size="large"
                            onClick={handleButtonClick}
                            style={{ borderRadius: 6 }}
                        >
                            New opening
                        </Button>
                    ]}
                    style={{
                        padding: 0,
                    }}
                />
                
                <Row style={{ paddingTop: 24 }}>
                    <Col span={24}>
                        <Steps 
                            style={{ 
                                maxWidth: '600px', 
                                paddingLeft: 24,
                                paddingRight: 24,
                                marginLeft: 'auto', 
                                marginRight: 'auto',
                            }}>
                            <Step status="process" title="Create opening" icon={<PlusOutlined />} />
                            <Step status="process" title="Get leads" icon={<IdcardOutlined />} />
                            <Step status="process" title="Interview" icon={<UserOutlined />} />
                        </Steps>
                    </Col>
                </Row>
            </div>

            { loading || !openings ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                openings.map((opening) => {
                    return (
                        <div style={{ paddingBottom: 8 }}>
                            <JobOpeningCard 
                                jobOpening={opening}
                                // id={opening.id} 
                                // status={opening.status}
                                // title={opening.title}
                                // team={opening.team}
                                // yearsOfExperience={opening.years_of_experience}
                                // createdBy={opening['opening_created_by']['user']}
                                // programmingLanguages={opening.programming_languages}
                            />
                        </div>
                    );
                })
            
            )}
            <br/>
        </div>
    );
}

export default HomeView;
