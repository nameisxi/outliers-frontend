import { useNavigate } from 'react-router-dom';
import { Card, Badge, Typography, Row, Col } from 'antd';

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
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    // title={props.title}
                    
                    description={
                        <div>
                            {/* <Typography.Text type="secondary">{props.team}, created by: {props.createdBy}</Typography.Text> */}
                            <Row>
                                <Col span={12}>
                                    <Title level={5} style={{ margin: 0 }}>{props.title}</Title>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <p>Created by: {props.createdBy}</p>
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
