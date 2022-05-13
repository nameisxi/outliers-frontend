import { useState, useEffect } from 'react';
import { Typography, Table } from 'antd';

import LeadsTable from '../../LeadsTable';

const { Title } = Typography;

function JobOpeningCandidates() {
    return (
        <div>
            <br/>
            <Title level={4}>Leads</Title>
            <br/>
            <LeadsTable searchable={false} savedOnly={false} />
            <br/>
            <br/>

            <Title level={4}>Saved leads</Title>
            <br/>
            <LeadsTable searchable={false} savedOnly={true} />
        </div>
    );
}

export default JobOpeningCandidates;
