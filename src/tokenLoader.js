import { useState } from 'react';


function TokenLoader() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.Token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.Token);
    };

    return {
        setToken: saveToken,
        token
    };
}

export default TokenLoader; 
