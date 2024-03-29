import { PageHeader, Typography } from 'antd';
import CandidateTable from '../CandidateTable';

const { Title } = Typography;


function CandidateSearchView() {
    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            <PageHeader 
                title={<Title level={2}>Candidate Search</Title>} 
                style={{ padding: 0 }} 
            />
            <CandidateTable searchable={true} savedOnly={false} />
        </div>
    );
}

export default CandidateSearchView;