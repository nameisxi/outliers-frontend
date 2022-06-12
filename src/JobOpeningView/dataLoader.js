import { CONFIGS } from '../config';


function getJobOpening(token, setToken, openingId, setJobOpening, setLoading) {
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
            if (response.status === 401) {
                setToken({ "Token": undefined });
                window.scrollTo(0, 0);
                window.location.reload();
            }
            return response.json();
        }))
    }).then((data) => {
        const jobOpening = data[0];
        setJobOpening(jobOpening);
        setLoading(false);
    })
}

export default getJobOpening;