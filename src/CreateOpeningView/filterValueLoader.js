import { CONFIGS } from '../config';


function getFilterValues(token, setToken, setFilterValues, setLoading, setInitialized) {
    setLoading(true);

    const uniqueValuesUrl = `${CONFIGS.HOST}/technologies/values/`;

    Promise.all([
        fetch(uniqueValuesUrl, { 
            method: 'get', 
            headers: new Headers({
                'Authorization': `${token}`, 
                'Accept': 'application/json',
            }), 
        }),
    ]).then((responses) => {
        return Promise.all(responses.map((response) => {
            if (response.status === 401) {
                setToken({ "Token": undefined });
                window.scrollTo(0, 0);
                window.location.reload();
            }
            return response.json();
        }))
    }).then((data) => {
        const uniqueValues = data[0];

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

        setFilterValues(filterValues);
        setInitialized(true);
        setLoading(false);
    })
}

export default getFilterValues;
