import { useParams } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;


function JobOpeningView() {
    const { openingId } = useParams();

    return (
        <div>
            <Title level={2}>Job Opening - { openingId }</Title>
        </div>
    );
}

export default JobOpeningView;
