import { Descriptions, Badge } from 'antd';

function JobOpeningDetails() {
    return (
        <div>
            <br/>
            <Descriptions 
                title="Details"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >
                <Descriptions.Item label="Status" span={4}>
                    <Badge status="processing" text="Active" />
                </Descriptions.Item>
                <Descriptions.Item label="Team" span={2}>Backend product team</Descriptions.Item>
                <Descriptions.Item label="Hiring manager" span={2}>John Doe</Descriptions.Item>
                <Descriptions.Item label="Created at" span={2}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Updated at" span={2}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
            </Descriptions>
            <br/>

            <Descriptions 
                title="Compensation"
                layout="vertical" 
                column={{ xs: 3, sm: 4, md: 4}}
                bordered
            >
                <Descriptions.Item label="Base" span={1}>30-50M KRW</Descriptions.Item>
                <Descriptions.Item label="Equity" span={1}>5-10M KRW</Descriptions.Item>
                <Descriptions.Item label="Other" span={1}>0 KRW</Descriptions.Item>
                <Descriptions.Item label="Total" span={3}>35-60M KRW</Descriptions.Item>
            </Descriptions>
            <br/>
        </div>
    );
}

export default JobOpeningDetails;
