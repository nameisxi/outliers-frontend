import { CONFIGS } from '../config';


function getOpening(token, setToken, openingId, setOpening, setLoading) {
    setLoading(true);

    const url = `${CONFIGS.HOST}/openings/${openingId}/`;

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
        const opening = data[0];

        setOpening(opening);
        setLoading(false);
    })
}

export default getOpening;
