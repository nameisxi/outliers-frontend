import { CONFIGS } from '../config';


function getJobOpening(token, openingId, setJobOpening, setLoading) {
    setLoading(true);

    let url = `${CONFIGS.HOST}/openings/${openingId}/`;

    Promise.all([
        fetch(url, { 
            method: 'get', 
            headers: new Headers({
                'Authorization': `Token ${token}`, 
                'Accept': 'application/json',
            }), 
        }),
    ]).then((responses) => {
        return Promise.all(responses.map((response) => {
            return response.json();
        }))
    }).then((data) => {
        const jobOpening = data[0];
        setJobOpening(jobOpening);
        setLoading(false);
    })
}

export default getJobOpening;