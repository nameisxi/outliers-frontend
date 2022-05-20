import { Typography, Button } from 'antd';

import LeadsTable from '../../LeadsTable';

const { Title } = Typography;

function JobOpeningLeads(props) {
    const parseProgrammingLanguages = (languages) => {
        const parsedLanguages = [];

        languages.forEach((language) => {
            parsedLanguages.push(language['name']);
        });

        return parsedLanguages;
    }
    return (
        <div>
            <br/>
            <LeadsTable 
                title="Leads"
                titleLevel={3}
                searchable={false} 
                savedOnly={false} 
                programmingLanguages={parseProgrammingLanguages(props.jobOpening.programming_languages)}
                topics={props.jobOpening.topics}
            />
            <br/>
            <br/>

            {/* <Title level={4}>Saved leads</Title>
            <br/>
            <LeadsTable searchable={false} savedOnly={true} /> */}
        </div>
    );
}

export default JobOpeningLeads;
