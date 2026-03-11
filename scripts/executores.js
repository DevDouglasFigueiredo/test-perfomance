import http from 'k6/http';
import { check, sleep } from 'k6';

export function setup() {
    console.log('Iniciando o teste de desempenho...');
    return {
        baseUrl: 'http://localhost:3000',
    }
}

export const options = {
    scenarios: {
        carga_constante: {
            executor: 'constant-vus',
            vus: 5,
            duration: '15s',
        },
        aumento_gradual: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '10s', target: 5 }, // Ramp-up para 5 usuários em 10 segundos
                { duration: '10s', target: 10 }, // sobe para 10 usuarios em 10s
                { duration: '10s', target: 0 }, // reduz para 0 vus]
            ],
        },
        iteracoes_compartilhadas: {
            executor: 'shared-iterations',
            vus: 5,
            iterations: 1200,
        },
        taxa_constante: {
            executor: 'constant-arrival-rate',
            rate: 20, // 20 requisições por segundo
            timeUnit: '1s', // por segundo
            duration: '15s',
            preAllocatedVUs: 5, // VUs pré-alocados para lidar com a carga
        },
        taxa_variavel: {
            executor: 'ramping-arrival-rate',
            startRate: 5, // Inicia com 5 requisição por segundo
            timeUnit: '1s', // por segundo
            preAllocatedVUs: 10, // VUs pré-alocados para lidar com a carga
            stages: [
                { duration: '10s', target: 10 }, // Aumenta para 10 requisições por segundo em 10 segundos
                { duration: '10s', target: 20 }, // Aumenta para 20 requisições por segundo em 10 segundos
                { duration: '10s', target: 0 }, // Reduz para 0 requisições por segundo em 10 segundos
            ],
        }
    }
}

export default function (data) {
    const res = http.get(`${data.baseUrl}/produtos`);
    check(res, {
        'status = 200': (response) => response.status === 200,
    })
}