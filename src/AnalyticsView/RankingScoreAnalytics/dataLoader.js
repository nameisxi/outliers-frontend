import { CONFIGS } from '../../config';


function getRankingScores(token, setToken, setRankingScores, setLoading) {
    setLoading(true);

    Promise.all([
        fetch(`${CONFIGS.HOST}/scores/distributions/`, { 
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
        const parsedRankingScores = {
            'work_score': [],
            'popularity_score': [],
        };
        const rankingScores = data[0];

        Object.entries(rankingScores).forEach(([scoreName, scoreValues]) => {
            scoreValues.forEach((scoreValue) => {
                parsedRankingScores[scoreName].push({ value: scoreValue * 100 });
            });
        });

        setRankingScores(parsedRankingScores);
        setLoading(false);
    })
}

export default getRankingScores;
