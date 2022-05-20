import { CONFIGS } from '../config';


function getLeads(token, setResultCount, setNextPage, setLeads, setFilterValues, setInitialized, setLoading, filters, nextPageUrl=null, currentLeads=null) {
    setLoading(true);

    const keyToQueryParameterMappings = {
        'languages': 'language',
        'technologies': 'technology',
        'topics': 'topic',
    };

    let url = `${CONFIGS.HOST}/users/candidates/?format=json&limit=10`;
    if (nextPageUrl) {
        url = nextPageUrl;
    } else {
        Object.entries(filters).forEach(([key, values]) => {
            values.forEach((value) => {
                url = `${url}&${keyToQueryParameterMappings[key]}=${encodeURIComponent(value)}`;
            });
        });
    }

    const uniqueValuesUrl = `${CONFIGS.HOST}/technologies/values/`;

    Promise.all([
        fetch(nextPageUrl ? nextPageUrl : url, { 
            method: 'get', 
            headers: new Headers({
                'Authorization': `Token ${token}`, 
            }), 
        }),
        fetch(uniqueValuesUrl, { 
            method: 'get', 
            headers: new Headers({
                'Authorization': `${token}`, 
            }), 
        }),
    ]).then((responses) => {
        return Promise.all(responses.map((response) => {
            return response.json();
        }))
    }).then((data) => {
        console.log("DATA:", data[0]);
        const resultCount = data[0]['count'];
        const nextPage = data[0]['next'];
        const newLeads = data[0]['results'];
        const leads = currentLeads ? currentLeads.concat(newLeads) : newLeads;
        const uniqueValues = data[1];

        const filterValues = {
            'programming_languages': [],
            'technologies': [],
            'topics': [],
        };
        Object.entries(uniqueValues).map(([key, values]) => {
            values.forEach((value) => {
                value = value.toUpperCase();
                filterValues[key].push({ value });
            }); 
        });

        setResultCount(resultCount);
        setNextPage(nextPage);
        setLeads(leads);
        setFilterValues(filterValues);
        setInitialized(true);
        setLoading(false);
    })
}

export default getLeads;