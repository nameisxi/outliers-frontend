import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';


function JobOpening(props) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/openings/${props.id}`);
        window.scrollTo(0, 0);
    }
    
    const getJobOpening = (id) => {
        return {
            'title': 'Software Engineer',
            'technologies': ['Python', 'Java']
        };
    };

    const jobOpening = getJobOpening(props.id);
    
    return (
        <div onClick={handleCardClick}>
            <Card 
                title={jobOpening.title} 
                hoverable={true}
            />
        </div>
    );
}

export default JobOpening;
