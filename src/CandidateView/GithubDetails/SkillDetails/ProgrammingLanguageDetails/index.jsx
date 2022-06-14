import { Card, Row, Col, Statistic, Typography, Tag } from 'antd';
import { CodeOutlined } from '@ant-design/icons';


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
                // <Col>
                <Tag 
                    key={tagName}
                    color='blue'
                    style={{ 
                        marginBottom: 8,
                        marginTop: 8,
                        marginLeft: 4,
                        marginRight: 4,
                    }}
                >
                    { `${tagName.toUpperCase()} (${Math.round(tagShare * 100)}%)` }
                </Tag>
                // </Col>
            );
        });
    
        return tagComponents;
    };

    return (
        <div style={{ height: '100%' }}>
            {/* <Card 
                bordered={false} 
                style={{ backgroundColor: 'transparent' }} 
                bodyStyle={{ 
                    paddingTop: 0, 
                    paddingLeft: 0, 
                    paddingRight: 0, 
                    paddingBottom: 8,
                }}
            >
                <Typography.Title level={3} style={{ margin: 0 }}>Programming Languages</Typography.Title> */}
                {/* <Typography.Text type='primary'>Candidate's Github language statistics from the past 3 years.</Typography.Text> */}
            {/* </Card> */}

            <Card style={{ borderRadius: 6, height: '100%' }}>
                <Row 
                    justify='space-evenly'
                    wrap={false}
                    gutter={[16, 16]}
                    align='top'
                >
                    <Col flex='none'>
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
                            style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}
                        />
                    </Col>
                    <Col flex='auto' style={{ paddingBottom: 8 }}>
                        <div style={{ 
                            // display: 'inline-block',
                            width: 'fit-content', 
                            // maxWidth: 'inherit',
                            // width: 'min-content',
                            marginLeft: 'auto', 
                            marginRight: 'auto' 
                        }}>
                            <Typography.Text type='secondary' style={{ marginLeft: 4 }}><CodeOutlined /> Most Used Programming Languages</Typography.Text>
                            <br/>
                            {/* <Row> */}
                                {setTags(props.githubAccount.programming_languages, 'language')}
                            {/* </Row> */}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProgrammingLanguageDetails;