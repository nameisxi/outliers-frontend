import { Card, Typography } from 'antd';


function CardTitle(props) {
    return (
        <Card 
            bordered={false} 
            style={{ 
                backgroundColor: 'transparent',
            }} 
            bodyStyle={{ 
                paddingTop: 0, 
                paddingLeft: 0, 
                paddingRight: 0, 
                paddingBottom: 8,
            }}
        >
            <Typography.Title level={3} style={{ margin: 0 }}>{props.title}</Typography.Title>
        </Card>
    );
}

export default CardTitle;
