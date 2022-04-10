import React from 'react';
import { Table, Typography } from 'antd';

const { Title } = Typography;


function LeadsView() {
    const getColumns = () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'University',
                dataIndex: 'university',
                key: 'university',
            }
        ];

        return columns;
    };

    const getData = () => {
        const data = [];

        for (let i = 0; i <= 100; i++) {
            const person = {
                key: `${i}`,
                name: 'John Brown',
                university: 'Yonsei University',
            };
            data.push(person);
        }

        return data;
    };

    const columns = getColumns();
    const data = getData();

    return (
        <div id="LeadsView">
            <Title level={1}>Leads</Title>
            <Table 
                columns={columns} 
                dataSource={data} 
            />
        </div>
    );
}

export default LeadsView;
