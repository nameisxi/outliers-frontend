import { useState, useEffect } from 'react';
import { Row, Col, Spin, Card } from 'antd';

import TokenLoader from '../../tokenLoader';
import CardTitle from '../../CardTitle';
import RankingScoreHistogram from './rankingScoreHistogram';
import getRankingScores from './dataLoader';


function RankingScoreAnalytics(props) {
    const { token, setToken } = TokenLoader();
    const [loading, setLoading] = useState(false);
    const [rankingScores, setRankingScores] = useState(null);

    useEffect(() => {
        if (!rankingScores) {
            getRankingScores(token, setToken, setRankingScores, setLoading);
        }
    }, []);

    return (
        <div>
            <CardTitle title='Ranking Scores' />
                { loading || !rankingScores ? (
                    <Spin tip='Loading...' size='large' />
                ) : (
                    <Row gutter={[16,16]}>
                        { 
                            Object.entries(rankingScores).map(([scoreName, scoreValues]) => {
                                return (
                                    <Col 
                                        xs={24}
                                        sm={24}
                                        md={12}
                                    >
                                        <RankingScoreHistogram title={scoreName} data={scoreValues} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                )}
        </div>
    );
}

export default RankingScoreAnalytics;