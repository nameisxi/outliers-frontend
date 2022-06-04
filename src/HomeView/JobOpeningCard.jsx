import { useNavigate } from 'react-router-dom';
import { Card, Badge, Typography, Row, Col, Button, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

function JobOpeningCard(props) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/openings/${props.id}`);
        window.scrollTo(0, 0);
    }

    const setTags = (tags) => {
        const tagComponents = [];
    
        tags.forEach((tag) => {
            tagComponents.push(
                <Tag 
                    key={tag['name']}
                    // color="blue"
                >
                    { tag['name'].toUpperCase() }
                </Tag>
            );
        });
    
        return tagComponents;
    };
    
    return (
        <div onClick={handleCardClick}>
            <Card 
                hoverable={true}
                style={{ borderRadius: 6 }}
            >
                <Card.Meta                    
                    description={
                        <div>
                            <Row>
                                <Col flex='auto'>
                                    <Title level={5} style={{ margin: 0 }}>{props.title}</Title>
                                </Col>
                                <Col flex='auto' style={{ textAlign: 'right' }}>
                                    {/* <Typography.Text type='secondary' style={{ paddingRight: 4 }}>Created by:</Typography.Text> */}
                                    <Button 
                                        style={{
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            border: '1px solid transparent',
                                        }}
                                        // onClick={handleAccountClick}
                                    >
                                        <Typography.Text type='secondary' style={{ paddingRight: 4 }}>
                                            {props.createdBy.first_name ? props.createdBy.first_name : props.createdBy.email}
                                        </Typography.Text>

                                        <Avatar size='small'>{props.createdBy.first_name ? props.createdBy.first_name.charAt(0).toUpperCase() : props.createdBy.email.charAt(0).toUpperCase()}</Avatar>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text type='secondary'>{props.team}</Typography.Text>
                                </Col>
                            </Row>
                            {/* <Row style={{ paddingTop: 8 }}>
                                <Col span={24}>
                                    <Typography.Text type='primary'>Programming languages:</Typography.Text>
                                    &nbsp;
                                    {setTags(props.programmingLanguages)}
                                </Col>
                            </Row> */}
                            <Row>
                                <Col span={24}>
                                    <Badge status="processing" text={props.status} />
                                </Col>
                            </Row>
                        </div>
                    }
                />
            </Card>
        </div>
    );
}

export default JobOpeningCard;
