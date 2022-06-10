import { useNavigate } from 'react-router-dom';
import { Card, Badge, Typography, Row, Col, Button, Avatar, Tag, Divider } from 'antd';


const { Title } = Typography;
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


function JobOpeningCard(props) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/openings/${props.jobOpening.id}`);
        window.scrollTo(0, 0);
    }

    const setTags = (tags) => {
        const tagComponents = [];
    
        tags.forEach((tag) => {
            tagComponents.push(
                <Tag 
                    key={tag['name']}
                    style={{
                        borderRadius: 4,
                    }}
                >
                    { tag['name'].toUpperCase() }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    const dateToString = (date) => {
        date = date.split('-');
        return `${months[parseInt(date[1])-1]} ${date[0]}`
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
                            <Row align='middle'>
                                <Col style={{ paddingBottom: 8 }}>
                                    <Title level={4} ellipsis style={{ margin: 0 }}>{props.jobOpening.title} &nbsp;</Title>
                                </Col>
                                <Col flex='auto' align='left' style={{ paddingBottom: 8 }}>
                                    <Typography.Text type='secondary'>{props.jobOpening.team}</Typography.Text>
                                </Col>
                                <Col flex='auto' align='right'>
                                    <Row align='right'>
                                        <Col flex='auto' style={{ marginRight: 8 }}>
                                            <Typography.Text type='primary' ellipsis style={{ maxWidth: 200 }}>
                                                {props.jobOpening.opening_created_by.user.first_name ? props.jobOpening.opening_created_by.user.first_name : props.jobOpening.opening_created_by.user.email.split('@')[0]}
                                            </Typography.Text>
                                            <p style={{ margin: 0, padding: 0 }}></p>
                                            <Typography.Text type='secondary'>
                                                {dateToString(props.jobOpening.created_at)}
                                            </Typography.Text>
                                        </Col>
                                        <Col flex='32px'>
                                            <Avatar size='large'>{props.jobOpening.opening_created_by.user.first_name ? props.jobOpening.opening_created_by.user.first_name.charAt(0).toUpperCase() : props.jobOpening.opening_created_by.user.email.charAt(0).toUpperCase()}</Avatar>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row style={{ paddingTop: 24 }}>
                                <Col span={24}>
                                    <Typography.Text type='primary'>Languages: </Typography.Text>
                                    {setTags(props.jobOpening.programming_languages)}
                                </Col>
                            </Row>
                            
                            { props.jobOpening.topics.length > 0 && 
                                <Row style={{ paddingTop: 8 }}>
                                    <Col span={24}>
                                        <Typography.Text type='primary'>Topics: </Typography.Text>
                                        {setTags(props.jobOpening.topics)}
                                    </Col>
                                </Row>
                            }

                            <Row style={{ paddingTop: 16 }}>
                                <Col span={24}>
                                    <Badge status="processing" text={props.jobOpening.status} />
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
