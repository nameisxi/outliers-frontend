import { CONFIGS } from '../config';


function getOpenings(token, setOpenings, setLoading) {
    setLoading(true);

    Promise.all([
        fetch(`${CONFIGS.HOST}/openings/`, { 
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
        setOpenings(data[0]);
        setLoading(false);
    })
}

export default getOpenings;
