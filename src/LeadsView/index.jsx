import { PageHeader, Typography } from 'antd';
import LeadsTable from '../LeadsTable';

const { Title } = Typography;


function LeadsView() {
    return (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
            <PageHeader 
                title={<Title level={1}>Lead search</Title>} 
                style={{ padding: 0 }} 
            />
            <LeadsTable searchable={true} savedOnly={false} />
        </div>
    );
}

export default LeadsView;