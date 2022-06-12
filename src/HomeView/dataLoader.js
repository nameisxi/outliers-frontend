import { CONFIGS } from '../config';


function getOpenings(token, setToken, setOpenings, setLoading) {
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
            if (response.status === 401) {
                setToken({ "Token": undefined });
                window.scrollTo(0, 0);
                window.location.reload();
            }
            return response.json();
        }))
    }).then((data) => {
        setOpenings(data[0]);
        setLoading(false);
    })
}

export default getOpenings;
