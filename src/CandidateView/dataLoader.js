import { CONFIGS } from '../config';


function getCandidate(token, setToken, candidateId, setCandidateData, setLoading) {
    setLoading(true);

    let url = `${CONFIGS.HOST}/users/candidates/${candidateId}/`;

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
        const candidateData = data[0];
        setCandidateData(candidateData);
        setLoading(false);
    })
}

export default getCandidate;
