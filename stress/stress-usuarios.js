import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 100 }, // Ramp-up para 100 usuários em 1 minuto
        { duration: '2m', target: 500 }, // Manter 500 usuários por 2 minutos
        { duration: '1m', target: 1000 }, // Ramp-up para 1000 usuários em 1 minuto
        {duration: '1m', target: 0 } // Ramp-down para 0 usuários em 1 minuto
    ],
}
export default function () {
    const res = http.get('http://localhost:3000/usuarios');
    check(res, {
        'status = 200' : (response) => response.status === 200
    });
}