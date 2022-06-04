import { Row, Col, Statistic, Card } from 'antd';

import CardTitle from '../../CardTitle';


function CandidateStatistics(props) {
    return (
        <div>
            <CardTitle title='Statistics' />
        
            <Card style={{ borderRadius: 6 }}>
                <Row>
                    <Col span={8}>
                        <Statistic title="All Leads" value={props.resultCount} />
                    </Col>

                    <Col span={8}>
                        <Statistic title="Active Leads" value={props.resultCount} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Saved Leads" value={0} />
                    </Col>
                    <Col flex='auto'>
                        
                    </Col>
                </Row>      
            </Card>
        </div>
    );
}

export default CandidateStatistics;
