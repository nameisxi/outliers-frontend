import { useState } from 'react';
import { Typography } from 'antd';

import CandidateTable from '../../CandidateTable';

const { Title, Text } = Typography;

function JobOpeningLeads(props) {
    const [filters, setFilters] = useState({
        languages: props.jobOpening.programming_languages ? props.jobOpening.programming_languages : [],
        technologies: props.jobOpening.technologies ? props.jobOpening.technologies : [],
        topics: props.jobOpening.topics ? props.jobOpening.topics : [],
    });

    const parseProgrammingLanguages = (languages) => {
        const parsedLanguages = [];

        languages.forEach((language) => {
            parsedLanguages.push(language['name']);
        });

        return parsedLanguages;
    }

    return (
        <div>
            <CandidateTable 
                searchable={false} 
                savedOnly={false} 
                programmingLanguages={props.jobOpening.programming_languages}
                topics={props.jobOpening.topics}
                openingId={props.jobOpening.id}
            />
        </div>
    );
}

export default JobOpeningLeads;
