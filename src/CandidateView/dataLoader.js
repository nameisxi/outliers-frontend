import { CONFIGS } from '../config';


function getCandidate(token, candidateId, setCandidateData, setLoading) {
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
            return response.json();
        }))
    }).then((data) => {
        const candidateData = data[0];
        setCandidateData(candidateData);
        setLoading(false);
    })
}

export default getCandidate;
