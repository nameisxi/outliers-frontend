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

    const parseDate = (date) => {
        let parsedDate = date;

        if (date.includes('T')) {
            parsedDate = date.split('T')[0];

            if (date.includes('.')) {
                parsedDate = `${parsedDate} ${date.split('T')[1].split('.')[0]}`;
            }
        }

        return parsedDate;
    }

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
                <Descriptions.Item label="Title" span={2}>{props.jobOpening.title}</Descriptions.Item>
                <Descriptions.Item label="Team" span={2}>{props.jobOpening.team}</Descriptions.Item>
                <Descriptions.Item label="Created by" span={2}>{props.jobOpening.opening_created_by.user.email}</Descriptions.Item>
                <Descriptions.Item label="Created at" span={2}>{parseDate(props.jobOpening.created_at)}</Descriptions.Item>
                
                { props.jobOpening.opening_updated_by?.user.email &&
                    <Descriptions.Item label="Updated by" span={2}>{props.jobOpening.opening_updated_by?.user.email}</Descriptions.Item>
                }

                { props.jobOpening.opening_updated_by?.user.email &&    
                    <Descriptions.Item label="Updated at" span={2}>{parseDate(props.jobOpening.updated_at)}</Descriptions.Item>
                }
   
                { props.jobOpening.desciption && 
                    <Descriptions.Item label="Description" span={4}>{props.jobOpening.desciption}</Descriptions.Item>
                }  
            </Descriptions>
            <br/>

            <Descriptions 
                title="Requirements"
                layout="vertical" 
                column={{ xs: 24, sm: 24, md: 24}}
                bordered
            >   
                <Descriptions.Item label="Years of Experience" span={12}>
                    {`${props.jobOpening.years_of_experience_min}${props.jobOpening.years_of_experience_max < 100 ? ` - ${props.jobOpening.years_of_experience_max}` : ''} years`}
                </Descriptions.Item>
                <Descriptions.Item label="Location" span={12}>
                    {'TODO'}
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
            </Descriptions>
            <br/>
        </div>
    );
}

export default JobOpeningDetails;
