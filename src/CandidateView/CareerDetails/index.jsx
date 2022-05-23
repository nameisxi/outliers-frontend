import { Descriptions, Badge, Tag } from 'antd';

function CareerDetails(props) {
    // const setTags = (tags) => {
    //     const tagComponents = [];
    
    //     tags.forEach((tag) => {
    //         tagComponents.push(
    //             <Tag 
    //                 key={tag['name']}
    //                 // icon={
    //                 //     <img 
    //                 //         src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tagName}/${tagName}-plain.svg`} 
    //                 //         height={15}
    //                 //         width={15}
    //                 //         style={{ verticalAlign: 'center' }}
    //                 //     />
    //                 // }
    //                 color="blue"
    //                 // style={{
    //                 //     height: 30,
    //                 //     verticalAlign: 'center'
    //                 // }}
    //             >
    //                 &nbsp;
    //                 { tag['name'].toUpperCase() }
    //             </Tag>
    //         );
    //     });
    
    //     return tagComponents;
    // };

    return (
        <div>
            <br/>
            <Descriptions 
                title="Career"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >
                {/* <Descriptions.Item label="Status" span={4}>
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
                    {props.jobOpening.created_at}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at" span={2}>
                    {props.jobOpening.updated_at}
                </Descriptions.Item> */}
            </Descriptions>
            <br/>

            <Descriptions 
                title="Education"
                layout="vertical" 
                column={{ xs: 4, sm: 4, md: 4}}
                bordered
            >
                {/* <Descriptions.Item label="Status" span={4}>
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
                    {props.jobOpening.created_at}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at" span={2}>
                    {props.jobOpening.updated_at}
                </Descriptions.Item> */}
            </Descriptions>
        </div>
    );
}

export default CareerDetails;
