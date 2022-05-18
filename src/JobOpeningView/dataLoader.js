import { CONFIGS } from '../config';


function getJobOpening(token, openingId, setJobOpening, setLoading) {
    setLoading(true);

    let url = `${CONFIGS.HOST}/openings/${openingId}`;
    console.log("URL:", url);

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
        // return response.json();
    }).then((data) => {
        console.log(data);
        const jobOpening = data[0];
        setJobOpening(jobOpening);
        setLoading(false);
    })
}

export default getJobOpening;