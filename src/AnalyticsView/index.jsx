import { Typography, PageHeader, Row, Col } from 'antd';

import RankingScoreAnalytics from './RankingScoreAnalytics';

const { Title } = Typography;


function AnalyticsView() {
    return (
        <div style={{ paddingLeft: 24, paddingRight: 24}}>
            <div 
                style={{ 
                    padding: 24,
                    borderRadius: 6, 
                    backgroundColor: '#fff',
                    marginBottom: 24,
                }}>
                <PageHeader 
                    title={<Title level={2} style={{ margin: 0 }}>Analytics</Title>} 
                    style={{
                        padding: 0,
                    }}
                />
            </div>
                
            <Row gutter={[16,16]} style={{ marginTop: 16, marginBottom: 16 }}>
                <Col 
                    xs={24}
                    sm={24}
                >
                    <RankingScoreAnalytics />
                </Col>
                {/* <Col 
                    xs={24}
                    sm={12}
                >
                    <CompanyOpeningAnalytics />
                </Col>
                <Col 
                    xs={24}
                    sm={12}
                >
                    <EmployeeAnalytics />
                </Col>       */}
            </Row>
        </div>
    );
}

export default AnalyticsView;
