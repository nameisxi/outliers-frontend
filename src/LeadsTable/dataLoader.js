import { CONFIGS } from '../config';


function getLeads(setState, setLoading, filters, savedOnly) {
    setLoading(true);

    let url = `${CONFIGS.HOST}/users/candidates/?format=json&limit=10`;
    Object.entries(filters).forEach(([key, values]) => {
        values.forEach((value) => {
            url = `${url}&${key}=${encodeURIComponent(value)}`;
        });
    });

    const uniqueValuesUrl = `${CONFIGS.HOST}/technologies/values/`;

    console.log("URL:", url);

    Promise.all([
        fetch(url),
        fetch(uniqueValuesUrl),
    ]).then((responses) => {
        return Promise.all(responses.map((response) => {
            return response.json();
        }))
    }).then((data) => {
        const leads = data[0]['results'];
        const uniqueValues = data[1];

        const filterValues = {
            'programming_languages': [],
            'technologies': [],
            'topics': [],
        };
        Object.entries(uniqueValues).map(([key, values]) => {
            values.forEach((value) => {
                filterValues[key].push({ value });
            }); 
        });

        const updatedState = {
            leads: leads,
            filterValues: filterValues,
            initialized: true,
        }

        setState(updatedState)
        setLoading(false);
    })
}

export default getLeads;