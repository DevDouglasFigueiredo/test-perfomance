//teste de longa duração para verificar a estabilidade do sistema sob carga constante

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5, // Número de usuários virtuais
  duration: '2h', // Duração do teste (exemplo reduzido)
};

export default function () {
  const res = http.get('http://localhost:3000/produtos');

  check(res, {
    'status = 200': (response) => response.status === 200,
  });

}