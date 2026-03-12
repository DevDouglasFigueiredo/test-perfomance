import http from 'k6/http';
import { check } from 'k6';
import { fazerLogin } from '../utils/auth.js';

export const options = {
    vus: 1,
    iterations: 1
};

export function setup() {
   const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
   const authToken = fazerLogin(baseUrl)
   return {authToken, baseUrl};
};

export default function (data) {
    const authHeader = {
        contentType: 'application/json',
        headers: {
            'Authorization': `${data.authToken}`,
        },
    };

    const response = http.get('http://localhost:3000/produtos', authHeader);
    console.log(`Resposta: ${response.body}`);
    check(response, {
        'get products successful': (resp) => resp.status === 200,
    });
}