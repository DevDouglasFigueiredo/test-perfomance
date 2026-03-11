import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 100 }, // Ramp-up para 100 usuários em 30 segundos
        { duration: '30s', target: 300 }, // Manter 300 usuários por 30 segundos
        { duration: '30s', target: 900 }, // Ramp-up para 900 usuários em 30 segundos
        {duration: '30s', target: 1200 } // Ramp-up para 1200 usuários em 30 segundos
    ],
}
export default function () {
    const res = http.get('http://localhost:3000/usuarios');
    check(res, {
        'status = 200' : (response) => response.status === 200
    });
}