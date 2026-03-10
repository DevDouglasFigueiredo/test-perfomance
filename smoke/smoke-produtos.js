import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
}

export default function () {
    const res = http.get('http://localhost:3000/produtos');
    check(res, {
        'status = 200' : (response) => response.status === 200,
    });
}