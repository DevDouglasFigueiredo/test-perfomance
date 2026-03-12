// Exemplo 1 — Thresholds básicos

// import http from 'k6/http';
// import { check } from 'k6';

// export const options = {
//     thresholds: {
//         http_req_duration: ['p(95)<500'], // 95% das requisições menor que 500ms
//         http_req_failed: ['rate<0.01'], // menos de 1% de falhas
//         checks: ['rate>0.98'], // 98% das validações devem passar
//     },
// };

// export default function () {
//     const res = http.get('http://localhost:3000/usuarios');
//     check(res, { 'status 200': (r) => r.status === 200 });
// }

// Exemplo 2 — Thresholds com diferentes percentis

// import http from 'k6/http';
// import { check } from 'k6';

// export const options = {
//     thresholds: {
//         http_req_duration: ['p(90)<400', // 90% das requisições menor que 400ms
//             'p(99)<1000', // 99% das requisições menor que 1s
//             'avg<300', // média geral menor que 300ms
//             'max<2000', // nenhuma requisição pode ultrapassar 2s
//         ],
//     },
// };

// export default function () {
//     const res = http.get('http://localhost:3000/produtos');
//     check(res, { 'status 200': (r) => r.status === 200 });
// }

// Exemplo 3 — Thresholds com métricas customizadas

// import { Trend, Rate } from 'k6/metrics';
// import http from 'k6/http';
// import { check } from 'k6';

// const tempoRequisicao = new Trend('tempo_requisicao');
// const taxaSucesso = new Rate('taxa_sucesso');

// export const options = {
//     thresholds: {
//         'tempo_requisicao': ['p(95)<300'], // 95% dos tempos menor que 300ms
//         'taxa_sucesso': ['rate>0.99'], // 99% de sucesso esperado
//     },
// };

// export default function () {
//     const res = http.get('http://localhost:3000/usuarios');
//     tempoRequisicao.add(res.timings.duration);
//     const ok = check(res, { 'status 200': (r) => r.status === 200 });
//     taxaSucesso.add(ok);
// }

// Exemplo 4 — Thresholds com contadores

// import http from 'k6/http';
// import { sleep } from 'k6';

// export const options = {
//     vus: 5,
//     iterations: 100,
//     thresholds: {
//         http_reqs: ['count >= 100'], // Garante que o teste fez pelo menos 100 requisições
//         iterations: ['count >= 50'], // Garante que o total de execuções é 50 vezes ou mais
//     },
// };

// export default function () {
//     http.get('http://localhost:3000/status');
//     sleep(1);
// }

// Exemplo 5 — Limiares com filtros (subseletores)

import http from 'k6/http';
import { check } from 'k6';
export const options = {
    thresholds: {
        'http_req_duration{expected_response:true}': ['p(95)< 6'],
        'http_req_duration{expected_response:false}': ['p(95)< 10'],
    },
};

export default function () {
    const res = http.get('http://localhost:3000/usuarios/0uxuPY0cbmQhpEz1');
    check(res, {
        'status 200 ou 404': (r) => [200, 404].includes(r.status),
    });
}