import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'antd';

import TokenLoader from '../../tokenLoader';
import { CONFIGS } from '../../config';


function DeleteOpeningModal(props) {  
    const { token, setToken } = TokenLoader();
    const navigate = useNavigate();
    let location = useLocation();

    const handleCancelButtonClick = (e) => {
        props.setVisible(false);
    };

    const deleteOpening = async () => {
        return fetch(
            `${CONFIGS.HOST}/openings/delete/${props.openingId}/`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, 
                },
            }
        ).then((response) => response.json());
    };

    const handleDeleteButtonClick = async () => {
        const response = await deleteOpening();
        props.setVisible(false);

        if (response['status'] === 200) {
            navigate(`/`, { state: { from: location}, replace: true });
            window.scrollTo(0, 0);
        }
    };

    return (
        <Modal
            title="Delete Opening"
            visible={props.visible}
            onOk={handleDeleteButtonClick}
            onCancel={handleCancelButtonClick}
            okButtonProps={{
                danger: true,
            }}
            okText='Delete'
        >
            <p>Are you sure you want to delete the opening?</p>
        </Modal>
    );
}

export default DeleteOpeningModal;