import { Descriptions, Badge, Tag, Typography, Card, Row, Col } from 'antd';

import CardTitle from '../../CardTitle';


function JobOpeningDetails(props) {
    const setTags = (tags) => {
        const tagComponents = [];
    
        tags.forEach((tag) => {
            tagComponents.push(
                <Tag 
                    key={tag['name']}
                    color="blue"
                >
                    { tag['name'].toUpperCase() }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    const parseDate = (date) => {
        let parsedDate = date;

        if (date.includes('T')) {
            parsedDate = date.split('T')[0];

            if (date.includes('.')) {
                parsedDate = `${parsedDate} ${date.split('T')[1].split('.')[0]}`;
            }
        }

        return parsedDate;
    }

    return (
        <div>
            <Row gutter={[16,16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <CardTitle title='Basic Information' />

                    <Descriptions 
                        layout="vertical" 
                        column={{ xs: 4, sm: 4, md: 4}}
                        style={{ 
                            backgroundColor: '#fff',
                            borderRadius: 6,
                        }}
                        // contentStyle={{
                        //     borderRadius: 6,
                        // }}
                        // bodyStyle={{
                        //     borderRadius: 6,
                        // }}
                        borderRadius={6}
                        bordered
                    >
                        <Descriptions.Item label="Status" span={4}>
                            <Badge status="processing" text={props.jobOpening.status} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Title" span={2}>{props.jobOpening.title}</Descriptions.Item>
                        <Descriptions.Item label="Team" span={2}>{props.jobOpening.team}</Descriptions.Item>
                        <Descriptions.Item label="Created by" span={2}>{props.jobOpening.opening_created_by.user.email}</Descriptions.Item>
                        <Descriptions.Item label="Created at" span={2}>{parseDate(props.jobOpening.created_at)}</Descriptions.Item>
                        
                        { props.jobOpening.opening_updated_by?.user.email &&
                            <Descriptions.Item label="Updated by" span={2}>{props.jobOpening.opening_updated_by?.user.email}</Descriptions.Item>
                        }

                        { props.jobOpening.opening_updated_by?.user.email &&    
                            <Descriptions.Item label="Updated at" span={2}>{parseDate(props.jobOpening.updated_at)}</Descriptions.Item>
                        }
        
                        { props.jobOpening.desciption && 
                            <Descriptions.Item label="Description" span={4}>{props.jobOpening.desciption}</Descriptions.Item>
                        }  
                    </Descriptions>
                </Col>

                <Col span={12}>
                    <Card 
                        bordered={false} 
                        style={{ 
                            backgroundColor: 'transparent',
                        }} 
                        bodyStyle={{ 
                            paddingTop: 0, 
                            paddingLeft: 0, 
                            paddingRight: 0, 
                            paddingBottom: 8,
                        }}
                    >
                        <Typography.Title level={3} style={{ margin: 0 }}>Requirements</Typography.Title>
                    </Card>

                    <Descriptions 
                        layout="vertical" 
                        column={{ xs: 24, sm: 24, md: 24}}
                        style={{ 
                            backgroundColor: '#fff',
                        }}
                        bordered
                    >   
                        <Descriptions.Item label="Years of experience" span={12}>
                            {`${props.jobOpening.years_of_experience_min}${props.jobOpening.years_of_experience_max < 100 ? ` - ${props.jobOpening.years_of_experience_max}` : ''} years`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Location" span={12}>
                            {'TODO'}
                        </Descriptions.Item>
                    </Descriptions>
                    
                    <Card 
                        bordered={false} 
                        style={{ 
                            backgroundColor: 'transparent',
                            marginTop: 16 + 16,
                        }} 
                        bodyStyle={{ 
                            paddingTop: 0, 
                            paddingLeft: 0, 
                            paddingRight: 0, 
                            paddingBottom: 8,
                        }}
                    >
                        <Typography.Title level={3} style={{ margin: 0 }}>Skills</Typography.Title>
                    </Card>

                    <Descriptions 
                        layout="vertical" 
                        column={{ xs: 4, sm: 4, md: 4}}
                        style={{ 
                            backgroundColor: '#fff',
                            borderRadius: 6,
                        }}
                        bordered
                    >   
                        <Descriptions.Item label="Programming languages" span={4}>
                            {setTags(props.jobOpening.programming_languages)}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    );
}

export default JobOpeningDetails;
