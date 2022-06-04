import { Card, Row, Col, Statistic, Typography, Tag } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

import ProgrammingLanguageUsage from './ProgrammingLanguageUsage';


function ProgrammingLanguageDetails(props) {
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
                <Typography.Title level={3} style={{ margin: 0 }}>Programming Languages</Typography.Title>
                {/* <Typography.Text type='primary'>Candidate's Github language statistics from the past 3 years.</Typography.Text> */}
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
                                    Languages
                                </Typography.Text>
                            }
                            value={props.githubAccount.programming_languages.length} 
                            valueStyle={{ fontSize: 34 }}
                        />
                    </Col>
                    <Col span={18} style={{ paddingBottom: 8 }}>
                        <Typography.Text type='secondary'><CodeOutlined /> Most Used Programming Languages</Typography.Text>
                        <br/>
                        {setTags(props.githubAccount.programming_languages, 'language')}
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col span={24}>
                        <ProgrammingLanguageUsage repos={props.githubAccount.repos} languages={props.githubAccount.programming_languages} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProgrammingLanguageDetails;