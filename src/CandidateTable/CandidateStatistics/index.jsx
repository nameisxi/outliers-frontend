import { Row, Col, Statistic, Card, Typography } from 'antd';

import CardTitle from '../../CardTitle';


function CandidateStatistics(props) {
    return (
        <div>
            <CardTitle title='Statistics' />
        
            <Card style={{ borderRadius: 6 }}>
                <Row justify='center'>
                    <Col flex='auto'>
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
                    </Col>

                    <Col flex='auto'>
                        <Statistic 
                            title={
                                <Typography.Text 
                                    type='secondary'
                                    style={{ 
                                        fontSize: 17, 
                                    }}
                                >
                                    New
                                </Typography.Text>
                            }
                            value={'TODO'}
                            valueStyle={{ fontSize: 30 }}
                        />
                    </Col>
                    <Col flex='auto'>
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
                            value={'TODO'} 
                            valueStyle={{ fontSize: 30 }}
                        />
                    </Col>
                </Row>      
            </Card>
        </div>
    );
}

export default CandidateStatistics;
