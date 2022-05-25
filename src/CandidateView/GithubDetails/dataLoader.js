import { CONFIGS } from '../../config';


function aggregateRepoData(account) {
    account.stargazers = 0;
    account.forkers = 0;
    account.watchers = 0;
    account.combinedSize = 0;

    account.repos.forEach((repo) => {
        account.stargazers += repo.stargazers_count;
        account.forkers += repo.forks_count;
        account.watchers += repo.watchers_count;
        account.combinedSize += repo.size_in_bytes;
    });

    return account;
}

function getGithubAccount(token, candidateId, setGithubAccount, setLoading) {
    if (!candidateId) return;
    
    setLoading(true);

    let url = `${CONFIGS.HOST}/github/${candidateId}`;

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
        let githubAccount = data[0];
        githubAccount = aggregateRepoData(githubAccount);

        setGithubAccount(githubAccount);
        setLoading(false);
    })
}

export default getGithubAccount;
