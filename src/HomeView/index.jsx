import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, PageHeader, Spin, Steps } from 'antd';
import { UserOutlined, IdcardOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';

import JobOpening from "./JobOpening";
import TokenLoader from '../tokenLoader';
import getOpenings from './dataLoader';

const { Title } = Typography;
const { Step } = Steps;


function HomeView() {
    // const getOpenings = () => {
    //     return [
    //         {
    //             'id': 1,
    //             'name': 'Backend Engineer',
    //         },
    //         {
    //             'id': 2,
    //             'name': 'Frontend Engineer',
    //         }
    //     ];
    // };

    // const openings = getOpenings();
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
                title={<Title level={1}>Job openings</Title>} 
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
            
            <Steps 
                style={{ 
                    maxWidth: '800px', 
                    paddingLeft: 24,
                    paddingRight: 24,
                    marginLeft: 'auto', 
                    marginRight: 'auto'
                }}>
                <Step status="finish" title="Create opening" icon={<PlusOutlined />} />
                <Step status="finish" title="Get leads" icon={<IdcardOutlined />} />
                <Step status="finish" title="Interview" icon={<UserOutlined />} />
                <Step status="finish" title="Hire" icon={<TeamOutlined />} />
            </Steps>
            <br/>
            <br/>
            { loading || !openings ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                openings.map((opening) => {
                    return (
                        <div>
                            <JobOpening 
                                id={opening.id} 
                                status={opening.status}
                                title={opening.title}
                                team={opening.team}
                                yearsOfExperience={opening.years_of_experience}
                                createdBy={opening['created_by']['user']['email']}
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
