import { Card, Row, Col, Statistic, Typography, Tag } from 'antd';
import {  ToolOutlined } from '@ant-design/icons';


function TopicDetails(props) {
    const setTags = (tags, fieldName) => {
        const tagComponents = [];
    
        const sortedTags = tags.sort((a, b) => {
            return b[`${fieldName}_share`] - a[`${fieldName}_share`];
        });
    
        sortedTags.slice(0, 5).forEach((tag) => {
            const tagName = tag[fieldName]['name'];
            const tagShare = tag[`${fieldName}_share`]

            tagComponents.push(
                <Tag 
                    key={tagName}
                    color='blue'
                    style={{ marginBottom: 8, marginTop: 8, }}
                >
                    { `${tagName.toUpperCase()} (${Math.round(tagShare * 100)}%)` }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    return (
        <div>
            <Card 
                bordered={false} 
                style={{ backgroundColor: 'transparent' }} 
                bodyStyle={{ 
                    paddingTop: 0, 
                    paddingLeft: 0, 
                    paddingRight: 0, 
                    paddingBottom: 8,
                }}
            >
                <Typography.Title level={3} style={{ margin: 0 }}>Topics & Technologies</Typography.Title>
                {/* <Typography.Text type='primary'>Candidate's Github topic & technology statistics from the past 3 years.</Typography.Text> */}
            </Card>

            <Card style={{ borderRadius: 6 }}>
                <Row>
                    <Col span={6} style={{ minWidth: 140 }}>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 20, 
                                    }}
                                >
                                    Topics & Technologies
                                </Typography.Text>
                            }
                            value={props.githubAccount.topics.length} 
                            valueStyle={{ fontSize: 34 }}
                    />
                    </Col>
                    <Col span={18} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'><ToolOutlined /> Most Used Topics & Technologies</Typography.Text>
                        <br/>
                        { props.githubAccount.topics.length > 0 ? (
                            setTags(props.githubAccount.topics, 'topic')
                        ) : (
                            <Typography.Text type='primary'>No topics or technologies found.</Typography.Text>    
                        )}
                        
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default TopicDetails;