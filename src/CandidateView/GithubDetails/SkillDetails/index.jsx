import { Card, Row, Col, Statistic, Typography, Tag } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

import CardTitle from '../../../CardTitle';
import ProgrammingLanguageDetails from './ProgrammingLanguageDetails';
import TopicDetails from './TopicDetails';
import ProgrammingLanguageUsage from './ProgrammingLanguageUsage';



function SkillDetails(props) {
    return (
        <div>
            <CardTitle title='Skills' />

            {/* <Card style={{ borderRadius: 6 }}> */}
                <Row gutter={[16, 16]}>
                    <Col 
                        xs={24}
                        sm={24}
                        md={12}
                    >
                        <ProgrammingLanguageDetails githubAccount={props.githubAccount} />
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                    >
                        <TopicDetails githubAccount={props.githubAccount} />
                    </Col>
                    <Col span={24}>
                        <ProgrammingLanguageUsage repos={props.githubAccount.repos} languages={props.githubAccount.programming_languages} />
                    </Col>
                </Row>
            {/* </Card> */}
        </div>
    );
}

export default SkillDetails;