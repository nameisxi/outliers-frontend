import { Card } from 'antd';
import { Histogram } from '@ant-design/plots';


function RankingScoreHistogram(props) {
    const data = props.data;

    const config = {
        data,
        binField: 'value',
        binWidth: 1,
        tooltip: {
            showMarkers: false,
            position: 'top',
        },
        interactions: [
            {
                type: 'element-highlight',
            },
        ],
    
        meta: {
            range: {
                min: 0,
                max: 100
            },
        },
    };

    return (
        <Card title={`${props.title} (${props.data.length} scores)`} style={{ borderRadius: 6 }}>
            <Histogram {...config} />
        </Card>
    );
}

export default RankingScoreHistogram;
  