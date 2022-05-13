import { CONFIGS } from '../config';


function getJobOpening(openingId, setJobOpening, setLoading) {
    setLoading(true);

    let url = `${CONFIGS.HOST}/openings/${openingId}`;
    console.log("URL:", url);

    // Promise.all([
    //     fetch(url),
    // ]).then((response) => {
    //     // return Promise.all(responses.map((response) => {
    //     //     return response.json();
    //     // }))
    //     return response.json();
    // }).then((data) => {
    //     const leads = data[0]['results'];
    //     const uniqueValues = data[1];

    //     const filterValues = {
    //         'programming_languages': [],
    //         'technologies': [],
    //         'topics': [],
    //     };
    //     Object.entries(uniqueValues).map(([key, values]) => {
    //         values.forEach((value) => {
    //             filterValues[key].push({ value });
    //         }); 
    //     });

    //     const updatedState = {
    //         leads: leads,
    //         filterValues: filterValues,
    //         initialized: true,
    //     }

    //     setState(updatedState)
    //     setLoading(false);
    // })
    const data = {
        'title': 'Backend Engineer',
        'yoe': '1',
        'technologies': [
            {
                'name': 'php', 
            },
            {
                'name': 'django',
            },
        ]
    }
    setJobOpening(data);
    setLoading(false);
}

export default getJobOpening;