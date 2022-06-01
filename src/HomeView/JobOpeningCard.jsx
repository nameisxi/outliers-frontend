import { useNavigate } from 'react-router-dom';
import { Card, Badge, Typography, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

function JobOpeningCard(props) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/openings/${props.id}`);
        window.scrollTo(0, 0);
    }

    const description = `Status`;
    
    return (
        <div onClick={handleCardClick}>
            <Card 
                hoverable={true}
            >
                <Card.Meta                    
                    description={
                        <div>
                            <Row>
                                <Col flex='auto'>
                                    <Title level={5} style={{ margin: 0 }}>{props.title}</Title>
                                </Col>
                                <Col flex='auto' style={{ textAlign: 'right' }}>
                                    <Typography.Text type='secondary' style={{ paddingRight: 4 }}>Created by:</Typography.Text>
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
                                    <p>{props.team}</p>
                                </Col>
                            </Row>
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
