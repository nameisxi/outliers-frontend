import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import JobOpening from "./JobOpening";

const { Title } = Typography;


function HomeView() {
    const getOpenings = () => {
        return [
            {
                'id': 1,
                'name': 'Backend Engineer',
            },
            {
                'id': 2,
                'name': 'Frontend Engineer',
            }
        ];
    };

    const jobOpenings = getOpenings();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/create-opening`);
        window.scrollTo(0, 0);
    }

    return (
        <div id="HomeView">
            <Title level={2}>Job openings</Title>
            <Button 
                type="primary" 
                size="large"
                onClick={handleButtonClick}
            >
                New opening
            </Button>
            <br/>
            <br/>
            { jobOpenings.map((opening) => {
                    return (
                        <div>
                            <JobOpening id={opening.id} />
                            <br/>
                        </div>
                    );
            })}
            <br/>
        </div>
    );
}

export default HomeView;
