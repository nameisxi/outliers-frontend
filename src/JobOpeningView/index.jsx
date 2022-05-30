import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';
import JobOpeningDetails from './JobOpeningDetails';
import JobOpeningLeads from './JobOpeningLeads';
import getJobOpening from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function JobOpeningView() {
    const [jobOpening, setJobOpening] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = TokenLoader();
    const { openingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!jobOpening) {
            getJobOpening(token, openingId, setJobOpening, setLoading);
        }
    }, []);

    const handleEditClick = () => {
        navigate(`/update-opening/${openingId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            {loading || !jobOpening ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <PageHeader 
                        title={jobOpening.title} 
                        subTitle={jobOpening.team}
                        // tags={<Badge status="processing" text={jobOpening.status} style={{ textAlign: 'right' }} />}
                        extra={[
                            <Button icon={<EditOutlined />} onClick={handleEditClick}>Edit</Button>,    
                            <Button icon={<DeleteOutlined />} danger>Delete</Button>,
                        ]}
                        style={{ padding: 0 }}
                    />
                    <br/>

                    <Tabs defaultActiveKey="details">
                        <TabPane tab="Details" key="details">
                            <JobOpeningDetails jobOpening={jobOpening} />
                        </TabPane>
                        <TabPane tab="Leads" key="leads">
                            <JobOpeningLeads jobOpening={jobOpening} />
                        </TabPane>

                        <TabPane tab="Interviews" key="interviews" disabled></TabPane>
                        <TabPane tab="Offers" key="offers" disabled></TabPane>
                        <TabPane tab="Hires" key="hires" disabled></TabPane>
                    </Tabs>
                </div>
            )}
            
        </div>
    );
}

export default JobOpeningView;
