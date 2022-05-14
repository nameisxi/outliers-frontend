import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs } from 'antd';

import JobOpeningDetails from './JobOpeningDetails';
import JobOpeningCandidates from './JobOpeningCandidates';
import getJobOpening from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function JobOpeningView() {
    const [jobOpening, setJobOpening] = useState(null);
    const [loading, setLoading] = useState(false);
    const { openingId } = useParams();

    const handleTabChange = (tabKey) => {
        console.log(tabKey);
    }

    useEffect(() => {
        if (!jobOpening) {
            getJobOpening(openingId, setJobOpening, setLoading);
        }
    }, []);

    return (
        <div>
            {loading || !jobOpening ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <PageHeader 
                        title={jobOpening.title} 
                        subTitle={`${'API Team'}`}
                    />
                    <br/>

                    <Tabs 
                        defaultActiveKey="details" 
                        onChange={handleTabChange}
                    >
                        <TabPane tab="Details" key="details">
                            <JobOpeningDetails />
                        </TabPane>
                        <TabPane tab="Candidates" key="candidates">
                            <JobOpeningCandidates />
                        </TabPane>
                    </Tabs>
                </div>
            )}
            
        </div>
    );
}

export default JobOpeningView;
