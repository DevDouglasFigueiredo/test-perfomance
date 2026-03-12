import http from 'k6/http';
import { check } from 'k6';

export function setup() {
    const payload = JSON.stringify({
        email: 'fulano@qa.com',
        password: 'teste',
    });

    const loginHeader = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const login = http.post('http://localhost:3000/login', payload, loginHeader);
    check(login, {
        'login successful': (resp) => resp.status === 200,
    });

    const authToken = login.json().authorization;
    console.log(`Token: ${authToken}`);

    return {
        authToken,
        baseUrl: 'http://localhost:3000'
    };
};

export default function (data) {
    const authHeader = {
        'Content-Type': 'application/json',
        'Authorization': `${data.authToken}`
    };

    const produto = http.post(`${data.baseUrl}/produtos`, JSON.stringify({
        "nome": "Produto Teste II ",
        "preco": 10,
        "descricao": "Descrição do produto teste",
        "quantidade": 100
    }), { headers: authHeader });

    check(produto, {
        'create product successful': (resp) => resp.status === 201,
    });

    console.log(`Produto criado: ${produto.body}`);
    const produtoId = produto.json('_id');
    console.log(`Produto ID: ${produtoId}`);

    const getResponseProduct = http.get(`${data.baseUrl}/produtos/${produtoId}`, { headers: authHeader });
    check(getResponseProduct, {
        'get product successful': (resp) => resp.status === 200,
    });

    const updateResponseProduct = http.put(`${data.baseUrl}/produtos/${produtoId}`, JSON.stringify({
        "nome": "Produto Teste Atualizado",
        "preco": 20,
        "descricao": "Descrição do produto teste atualizado",
        "quantidade": 50
    }), { headers: authHeader });

    check(updateResponseProduct, {
        'update product successful': (resp) => resp.status === 200,
    });

    const deleteResponseProduct = http.del(`${data.baseUrl}/produtos/${produtoId}`, null, { headers: authHeader });
    check(deleteResponseProduct, {
        'delete product successful': (resp) => resp.status === 200,
    });
}   