import { Descriptions, Badge, Tag } from 'antd';

function JobOpeningDetails(props) {
    const setTags = (tags) => {
        const tagComponents = [];
    
        tags.forEach((tag) => {
            tagComponents.push(
                <Tag 
                    key={tag['name']}
                    // icon={
                    //     <img 
                    //         src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tagName}/${tagName}-plain.svg`} 
                    //         height={15}
                    //         width={15}
                    //         style={{ verticalAlign: 'center' }}
                    //     />
                    // }
                    color="blue"
                    // style={{
                    //     height: 30,
                    //     verticalAlign: 'center'
                    // }}
                >
                    {/* &nbsp; */}
                    { tag['name'].toUpperCase() }
                </Tag>
            );
        });
    
        return tagComponents;
    };

    return (
        <div>
            <br/>
            <Descriptions 
                title="Basic information"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >
                <Descriptions.Item label="Status" span={4}>
                    <Badge status="processing" text={props.jobOpening.status} />
                </Descriptions.Item>
                <Descriptions.Item label="Team" span={2}>{props.jobOpening.team}</Descriptions.Item>
                <Descriptions.Item label="Created by" span={2}>{props.jobOpening.created_by.user.email}</Descriptions.Item>
                
                { props.jobOpening.desciption && 
                    <Descriptions.Item label="Description" span={4}>
                        {props.jobOpening.desciption}
                    </Descriptions.Item>
                }

                <Descriptions.Item label="Created at" span={2}>
                    {/* 2019-04-24 18:00:00 */}
                    {props.jobOpening.created_at}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at" span={2}>
                    {/* 2019-04-24 18:00:00 */}
                    {props.jobOpening.updated_at}
                </Descriptions.Item>
            </Descriptions>
            <br/>

            <Descriptions 
                title="Requirements"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >   
                {/* <Descriptions.Item label="Location" span={2}>
                    {props.jobOpening.location}
                </Descriptions.Item>      */}
                <Descriptions.Item label="Years of Experience" span={24}>
                    {`${props.jobOpening.years_of_experience_min} - ${props.jobOpening.years_of_experience_max} years`}
                </Descriptions.Item>
            </Descriptions>
            <br/>

            <Descriptions 
                title="Skills"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >   
                <Descriptions.Item label="Programming languages" span={4}>
                    {setTags(props.jobOpening.programming_languages)}
                </Descriptions.Item>
                {/* <Descriptions.Item label={"Technologies & Topics"} span={4}>
                    {props.jobOpening.topics}
                </Descriptions.Item>      */}
            </Descriptions>
            <br/>

            {/* <Descriptions 
                title="Compensation"
                layout="vertical" 
                column={{ xs: 3, sm: 4, md: 4}}
                bordered
            >
                <Descriptions.Item label="Base" span={1}>{`${props.jobOpening.base_compensation_min} - ${props.jobOpening.base_compensation_max} ${props.jobOpening.base_compensation_currency}`}</Descriptions.Item>
                <Descriptions.Item label="Equity" span={1}>{`${props.jobOpening.equity_compensation_min} - ${props.jobOpening.equity_compensation_max} ${props.jobOpening.equity_compensation_currency}`}</Descriptions.Item>
                <Descriptions.Item label="Other" span={1}>{`${props.jobOpening.other_compensation_min} - ${props.jobOpening.other_compensation_max} ${props.jobOpening.other_compensation_currency}`}</Descriptions.Item>
                <Descriptions.Item label="Total" span={3}>{`${props.jobOpening.base_compensation_min + props.jobOpening.equity_compensation_min + props.jobOpening.other_compensation_min} - ${props.jobOpening.base_compensation_max + props.jobOpening.equity_compensation_max + props.jobOpening.other_compensation_max} ${props.jobOpening.base_compensation_currency}`}</Descriptions.Item>
            </Descriptions>
            <br/> */}
        </div>
    );
}

export default JobOpeningDetails;
