import http from 'k6/http';
import { check } from 'k6';

export function fazerLogin(baseUrl) {
    const payload = JSON.stringify({
        email: 'fulano@qa.com',
        password: 'teste',
    });

    const loginHeader = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const login = http.post(`${baseUrl}/login`, payload, loginHeader);
    check(login, {
        'login successful': (resp) => resp.status === 200,
    });

    const token = login.json().authorization;
    console.log(`Token: ${token}`);

    return token;
};