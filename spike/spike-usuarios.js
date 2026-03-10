import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up para 10 usuários em 10 segundos
        { duration: '10s', target: 500 }, // Manter 500 usuários por 10 segundos
        { duration: '1m', target: 500 }, // Ramp-up para 1000 usuários em 1 minuto
        {duration: '10s', target: 0 } // Ramp-down para 0 usuários em 10 segundos
    ],

}
    export default function () {
        const res = http.get('http://localhost:3000/usuarios');
        check(res, {
            'status = 200' : (response) => response.status === 200
        });
    }
