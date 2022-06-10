import { useState } from 'react';
import { Card, Row, Col, Divider, Typography, Tag, Popover } from 'antd';
import { StarOutlined, ForkOutlined, EyeOutlined } from '@ant-design/icons';


function RepositoryCard(props) {
    // const [languagesTruncated, setLanguagesTruncated] = useState(null);
    const [languagePopoverHovering, setLanguagePopoverHovering] = useState(false);
    const [topicPopoverHovering, setTopicPopoverHovering] = useState(false);

    const setTags = (tags, fieldName) => {
        const tagComponents = [];
        
        if (fieldName === 'language') {
            tags = tags.sort((a, b) => {
                return b[`language_share`] - a[`language_share`];
            });

            tags = tags.filter((tag) => tag.language_share >= 0.01);
        }
    
        tags.forEach((tag) => {
            const tagName = tag[fieldName].name;
            const tagShare = fieldName === 'language' ? ` (${Math.round(tag.language_share * 100)}%)` : '';

            tagComponents.push(
                <Tag 
                    key={tagName}
                    // color='blue'
                    // style={{ marginBottom: 8, marginTop: 8 }}
                >
                    { `${tagName.toUpperCase()}${tagShare}` }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    const languages = setTags(props.repo.programming_languages, 'language');
    const topics = setTags(props.repo.topics, 'topic');

    const handleLanguagePopoverHover = (visibility) => {
        setLanguagePopoverHovering(visibility);
    };

    const handleTopicPopoverHover = (visibility) => {
        setTopicPopoverHovering(visibility);
    };

    // const handleLanguageOnEllipsis = (ellipsis) => {
    //     if (languages) {
    //         console.log("Ellipsis set:", ellipsis);
    //         setLanguagesTruncated(ellipsis);
    //     }
    // };

    return (
        <div 
            id={props.index}
            style={{ 
                display: 'inline-block', 
                verticalAlign: 'middle',
            }}
        >
            <Col>
                <Card 
                    style={{
                        width: 350,
                        height: 155,
                        borderRadius: 6,
                        backgroundColor: '#fafafa',
                    }}
                    bodyStyle={{
                        paddingTop: 18,
                        paddingLeft: 12,
                        paddingRight: 12,
                    }}
                >
                    <Row align='middle'>
                        <Col flex='110px'>
                            <Typography.Title level={5} style={{ margin: 0 }}>{`Repository #${props.index + 1}`}</Typography.Title>
                        </Col>
                        <Col flex='auto' align='right'>
                            <Typography.Text type='secondary'><StarOutlined /> {props.repo.stargazers_count} <Divider type="vertical" /></Typography.Text>
                            <Typography.Text type='secondary'><EyeOutlined /> {props.repo.watchers_count} <Divider type="vertical" /></Typography.Text>
                            <Typography.Text type='secondary'><ForkOutlined /> {props.repo.forks_count}</Typography.Text>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} style={{ position: 'absolute', bottom: 40 }}>
                            <Typography.Text 
                                type='primary' 
                                style={{
                                    width: 500 - (1 + 24 + 24 + 1),
                                }}
                                ellipsis={{
                                    // onEllipsis: handleLanguageOnEllipsis,
                                }}
                            >
                                Languages:
                                &nbsp;
                                <Popover
                                    trigger='hover'
                                    title='Languages'
                                    content={languages} 
                                    visible={languages.length > 0 && languagePopoverHovering}
                                    onVisibleChange={handleLanguagePopoverHover}
                                >
                                    {languages.length > 0 ? languages : <Typography.Text>No languages</Typography.Text>}
                                </Popover>
                            </Typography.Text>
                        </Col>
                    </Row>

                    <Row style={{ position: 'absolute', bottom: 8 }}>
                        <Col span={24}>
                            <Typography.Text 
                                type='primary' 
                                style={{
                                    width: 500 - (1 + 24 + 24 + 1),
                                }}
                                ellipsis={{
                                    // onEllipsis: handleLanguageOnEllipsis,
                                }}
                            >
                                Topics:
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <Popover
                                    trigger='hover'
                                    title='Topics'
                                    content={topics}  
                                    visible={topics.length > 0 && topicPopoverHovering}
                                    onVisibleChange={handleTopicPopoverHover}
                                >
                                    {topics.length > 0 ? topics : <Typography.Text>No topics</Typography.Text>}
                                </Popover>
                            </Typography.Text>
                        </Col>
                    </Row>                    
                </Card>
            </Col>
        </div>
    );
}

export default RepositoryCard;
