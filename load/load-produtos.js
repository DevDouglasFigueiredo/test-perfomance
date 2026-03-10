import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10, // Número de usuários virtuais
    duration: '3m', // Duração do teste
}

export default function () {
    const res = http.get('http://localhost:3000/produtos');
    check(res, {
        'status = 200' : (response) => response.status === 200
    });
}