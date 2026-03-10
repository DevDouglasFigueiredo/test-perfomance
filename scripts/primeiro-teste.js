import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5, // Número de usuários virtuais
  duration: '10s', // Duração do teste
};

export default function () {
  const res = http.get('http://localhost:3000/produtos');

  check(res, {
    'status = 200': (response) => response.status === 200,
    'response time is less than 500ms': (response) => response.timings.duration < 500,
    'response body contains produtos': (response) => response.body.includes('produtos'),
  });

  sleep(1); // Pausa de 1 segundo entre as requisições
}