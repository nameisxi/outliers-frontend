import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Typography, Spin, Tabs } from 'antd';

import TokenLoader from '../tokenLoader';
// import JobOpeningDetails from './JobOpeningDetails';
// import JobOpeningCandidates from './JobOpeningCandidates';
// import getJobOpening from './dataLoader';

const { Title } = Typography;
const { TabPane } = Tabs;


function LeadView() {
    // const [jobOpening, setJobOpening] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = TokenLoader();
    const { openingId } = useParams();

    // const handleTabChange = (tabKey) => {
    //     console.log(tabKey);
    // }

    // useEffect(() => {
    //     if (!jobOpening) {
    //         getJobOpening(token, openingId, setJobOpening, setLoading);
    //     }
    // }, []);

    const jobOpening = true;

    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            {loading || !jobOpening ? (
                <Spin tip='Loading...' size='large' />
            ) : (
                <div>
                    <PageHeader 
                        title="Lead view - TODO"
                        // subTitle={jobOpening.team}
                        style={{ padding: 0 }}
                    />
                    <br/>

                    {/* <Tabs 
                        defaultActiveKey="details" 
                        onChange={handleTabChange}
                    >
                        <TabPane tab="Details" key="details">
                            <JobOpeningDetails jobOpening={jobOpening} />
                        </TabPane>
                        <TabPane tab="Candidates" key="candidates">
                            <JobOpeningCandidates jobOpening={jobOpening} />
                        </TabPane>
                    </Tabs> */}
                </div>
            )}
            
        </div>
    );
}

export default LeadView;
