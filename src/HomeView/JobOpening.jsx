import { useNavigate } from 'react-router-dom';
import { Card, Badge } from 'antd';


function JobOpening(props) {
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
                    title={props.title}
                    description={
                        <div>
                            <p>{props.team}, created by: {props.createdBy}</p>
                            <Badge status="processing" text={props.status} />
                        </div>
                    }
                />
            </Card>
        </div>
    );
}

export default JobOpening;
