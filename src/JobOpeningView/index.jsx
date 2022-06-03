import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';
import JobOpeningDetails from './JobOpeningDetails';
import JobOpeningLeads from './JobOpeningLeads';
import DeleteOpeningModal from './DeleteOpeningModal';
import getJobOpening from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function JobOpeningView() {
    const location = useLocation();
    const [jobOpening, setJobOpening] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fromCandidate = (location.state?.from && location.state.from.pathname.includes('/candidates/'));
    const [activeTab, setActiveTab]= useState(fromCandidate ? 'leads' : 'details');
    const [showModal, setShowModal] = useState(false);
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

    const handleDeleteButtonClick = () => {
        setShowModal(true);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            {loading || !jobOpening ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <DeleteOpeningModal openingId={openingId} visible={showModal} setVisible={setShowModal} />
                    <PageHeader 
                        title={jobOpening.title} 
                        subTitle={jobOpening.team}
                        extra={[
                            <Button icon={<EditOutlined />} onClick={handleEditClick}>Edit</Button>,    
                            <Button icon={<DeleteOutlined />} onClick={handleDeleteButtonClick} danger>Delete</Button>,
                        ]}
                        onBack={() => navigate('/')}
                        style={{ padding: 0 }}
                    />
                    <br/>

                    <Tabs 
                        activeKey={activeTab}
                        onChange={handleTabChange}
                    >
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
