import { Typography, Tag, Row, Col, Card } from 'antd';

import CardTitle from '../../CardTitle';


function CandidateFilters(props) {
    const shadeColor = (color, percent) => {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        let RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
        let GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
        let BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    };

    return (
        <div>
            <CardTitle title='Filters' />
            
            <Card style={{ borderRadius: 6, height: 1 + 125.85 + 1 }}>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col flex='170px'>
                                <Typography.Text type="secondary">Programming Languages: </Typography.Text>
                            </Col>
                            <Col flex='auto'>
                                { props.programmingLanguages ? 
                                    (
                                        props.programmingLanguages.map((language) => {
                                            if (props.filters.languages && props.filters.languages.includes(language.name) && !language.color) {
                                                language.color = '#2f54eb';
                                            }

                                            return (
                                                <Tag 
                                                    key={language.name} 
                                                    // color="blue"
                                                    style={{
                                                        backgroundColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}3F` : null,
                                                        borderColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}7F` : null,
                                                        color: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? shadeColor(language.color, -20) : null,
                                                        borderRadius: 4,
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {language.name.toUpperCase()}
                                                </Tag>
                                            );
                                        })
                                    ) : (
                                        <Typography.Text type='primary'>None selected</Typography.Text>
                                    )
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} style={{ paddingTop: 8 }}>
                        <Row>
                            <Col flex='54px'>
                                <Typography.Text type="secondary">Topics: </Typography.Text>
                            </Col>
                            <Col flex='auto'>
                                { props.topics ? 
                                    (
                                        props.topics.map((topic) => {
                                            return (
                                                <Tag 
                                                    key={topic.name} 
                                                    // color="blue"
                                                    // style={{
                                                    //     backgroundColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}3F` : null,
                                                    //     borderColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}7F` : null,
                                                    //     color: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? shadeColor(language.color, -20) : null,
                                                    // }}
                                                >
                                                    {topic.name.toUpperCase()}
                                                </Tag>
                                            );
                                        })
                                    ) : (
                                        // <Typography.Text type='primary'>None selected</Typography.Text>
                                        <Typography.Text type='primary'>TODO</Typography.Text>
                                    )
                                }
                            </Col>
                        </Row>
                    </Col>

                    {/* <Col span={24} style={{ paddingTop: 8 }}>
                        <Typography.Text type="secondary" style={{ paddingRight: 8 }}>Technologies:</Typography.Text>
                        { props.technologies ? 
                            (
                                props.technologies.map((technology) => {
                                    return (
                                        <Tag 
                                            key={technology.name} 
                                            // color="blue"
                                            // style={{
                                            //     backgroundColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}3F` : null,
                                            //     borderColor: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? `${shadeColor(language.color, 0)}7F` : null,
                                            //     color: props.filters.languages && props.filters.languages.includes(language.name) && language.color ? shadeColor(language.color, -20) : null,
                                            // }}
                                        >
                                            {technology.name.toUpperCase()}
                                        </Tag>
                                    );
                                })
                            ) : (
                                // <Typography.Text type='primary'>None selected</Typography.Text>
                                <Typography.Text type='primary'>TODO</Typography.Text>
                            )
                        }
                    </Col> */}
                </Row>
            </Card>
        </div>
    );
}

export default CandidateFilters;