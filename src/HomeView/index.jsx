import { Typography, Button } from 'antd';

import JobOpening from "./JobOpening";

const { Title } = Typography;


function HomeView() {
    const getOpenings = () => {
        return [
            {
                'company_id': 1,
                'name': 'Company 1',
                'openings': [
                    {
                        'id': 1,
                    }
                ]
            },
            {
                'company_id': 2,
                'name': 'Company 2',
                'openings': [
                    {
                        'id': 4,
                    },
                    {
                        'id': 2,
                    },
                    {
                        'id': 3,
                    }
                ]
            }
        ];
    };

    const companyOpenings = getOpenings();

    return (
        <div id="HomeView">
            
            <div>
                { companyOpenings.map((company, i) => {
                    return (
                        <div>
                            <Title level={2}>Current openings - { company.name }</Title>
                            <Button type="primary" size="large">New opening</Button>
                            <br/>
                            <br/>
                            { company.openings.map((opening, j) => {
                                    return (
                                        <div>
                                            <JobOpening id={opening.id} />
                                            <br/>
                                        </div>
                                    );
                            })}
                            <br/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HomeView;
