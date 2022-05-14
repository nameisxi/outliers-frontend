import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, PageHeader, Spin } from 'antd';

import JobOpening from "./JobOpening";
import TokenLoader from '../tokenLoader';
import getOpenings from './dataLoader';

const { Title } = Typography;


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
            />
            <br/>
            <Button 
                type="primary" 
                size="large"
                onClick={handleButtonClick}
            >
                New opening
            </Button>
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
