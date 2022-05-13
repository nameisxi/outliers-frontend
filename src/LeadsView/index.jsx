import { PageHeader } from 'antd';
import LeadsTable from '../LeadsTable';


function LeadsView() {
    return (
        <div>
            <PageHeader title="Leads search"/>
            <LeadsTable searchable={true} savedOnly={false} />
        </div>
    );
}

export default LeadsView;