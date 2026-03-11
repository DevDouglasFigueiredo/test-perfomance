import http from 'k6/http';
import { check } from 'k6';

export function setup() {
    const payload = JSON.stringify({
        email: 'fulano@qa.com',
        password: 'teste',
    });

    const loginHeader = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const login = http.post('http://localhost:3000/login', payload, loginHeader);
    check(login, {
        'login successful': (resp) => resp.status === 200,
    });

    const token = login.json().authorization;
    console.log(`Token: ${token}`);

    return { token };
};

export default function (data) {
    const authHeader = {
        contentType: 'application/json',
        headers: {
            'Authorization': `${data.token}`,
        },
    };

    const response = http.get('http://localhost:3000/produtos', authHeader);
    check(response, {
        'get products successful': (resp) => resp.status === 200,
    });
}