import { Tag } from 'antd';


function roundScore(score) {
    return Math.round((score + Number.EPSILON) * 100) / 100;;
}

function setTags(tags, fieldName, filters){
    const tagComponents = [];

    const sortedTags = tags.sort((a, b) => {
        return b[`${fieldName}_share`] - a[`${fieldName}_share`];
    });

    sortedTags.slice(0, 5).filter((tag) => tag[`${fieldName}_share`] >= 0.01).forEach((tag) => {
        const tagName = tag[fieldName]['name'];
        const tagShare = tag[`${fieldName}_share`]

        tagComponents.push(
            <Tag 
                key={tagName}
                // icon={
                //     <img 
                //         src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tagName}/${tagName}-plain.svg`} 
                //         height={15}
                //         width={15}
                //         style={{ verticalAlign: 'center' }}
                //     />
                // }
                // color={filters && filters.includes(tagName) ? "blue" : "red"}
                // style={{
                //     height: 30,
                //     verticalAlign: 'center'
                // }}
                color={filters.includes(tagName) ? 'blue' : null}
            >
                &nbsp;
                {/* { `${fieldName.toUpperCase()} (${Math.round(percentage * 100)}%)` } */}
                { `${tagName.toUpperCase()} (${Math.round(tagShare * 100)}%)` }
            </Tag>
        );
    });

    return tagComponents;
}

function createColumns(setColumns, filters) {
    console.log("FILTERS:", filters);
    const columns = [
        { 
            title: 'Work score', 
            dataIndex: 'work_score', 
            key: 'work_score',
            render: score => roundScore(score),
        },
        { 
            title: 'Location', 
            dataIndex: 'location', 
            key: 'location' 
        },
        { 
            title: 'Employer', 
            dataIndex: 'employer', 
            key: 'employer' 
        },
        // { 
        //     title: 'School', 
        //     dataIndex: 'school', 
        //     key: 'school' 
        // },
        // { 
        //     title: 'Popularity score', 
        //     dataIndex: 'popularity_score', 
        //     key: 'popularity_score' 
        // },
        { 
            title: 'Most used languages (% of all code committed)', 
            dataIndex: ['github_accounts', '0', 'programming_languages'], 
            key: 'programming_languages',
            render: languages => setTags(languages, 'language', filters.language),
        },
        // { 
        //     title: 'Technologies', 
        //     dataIndex: ['github_accounts', '0', 'technologies'], 
        //     key: 'technologies',
        //     render: technologies => setTags(technologies, 'technology'),
        // },
        { 
            title: 'Most used topics & technologies (% of all repositories)', 
            dataIndex: ['github_accounts', '0', 'topics'], 
            key: 'topics',
            render: topics => setTags(topics, 'topic', filters.topic),
        },
        { 
            title: 'Github', 
            dataIndex: 'github_url', 
            key: 'github_url',
            render: url => <a href={url}>{url}</a>,
        },
        { 
            title: 'Linkedin', 
            dataIndex: 'linkedin_url', 
            key: 'linkedin_url' 
        },
        { 
            title: 'Website', 
            dataIndex: 'website_url', 
            key: 'website_url' 
        },
        { 
            title: 'Email', 
            dataIndex: 'email', 
            key: 'email' 
        },
    ];

    setColumns(columns);
    // return columns;
}

export default createColumns;