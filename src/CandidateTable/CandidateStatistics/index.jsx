import { Row, Col, Statistic, Card, Typography } from 'antd';

import CardTitle from '../../CardTitle';


function CandidateStatistics(props) {
    return (
        <div>
            <CardTitle title='Statistics' />
        
            <Card style={{ borderRadius: 6 }}>
                <Row 
                    justify='space-evenly'
                    gutter={[16,16]}
                >
                    <Col span={8}>
                        <div
                            style={{
                                width: 'fit-content',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 17, 
                                    }}
                                >
                                    All Leads
                                </Typography.Text>
                            }
                            value={props.resultCount} 
                            valueStyle={{ fontSize: 30 }}
                        />
                        </div>
                    </Col>

                    <Col span={8}>
                        <div
                            style={{
                                width: 'fit-content',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <Statistic 
                                title={
                                    <Typography.Text 
                                        type='secondary'
                                        style={{ 
                                            fontSize: 17, 
                                        }}
                                    >
                                        Unseen
                                    </Typography.Text>
                                }
                                value={2981}
                                valueStyle={{ fontSize: 30 }}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div
                            style={{
                                width: 'fit-content',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 17, 
                                    }}
                                >
                                    Saved
                                </Typography.Text>
                            }
                            value={23} 
                            valueStyle={{ fontSize: 30 }}
                            // style={{ textAlign: 'center' }}
                        />
                        </div>
                    </Col>
                </Row>      
            </Card>
        </div>
    );
}

export default CandidateStatistics;
