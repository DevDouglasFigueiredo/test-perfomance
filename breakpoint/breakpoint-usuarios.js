import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 100 }, // Ramp-up para 100 usuários em 1 minuto
        { duration: '30s', target: 300 }, // Manter 300 usuários por 2 minutos
        { duration: '30s', target: 900 }, // Ramp-up para 1000 usuários em 1 minuto
        {duration: '30s', target: 1200 } // Ramp-down para 0 usuários em 1 minuto
    ],
}
export default function () {
    const res = http.get('http://localhost:3000/usuarios');
    check(res, {
        'status = 200' : (response) => response.status === 200
    });
}