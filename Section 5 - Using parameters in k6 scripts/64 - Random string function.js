import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export const options = {
    vus: 5,
    duration: '10s',
};

export default function () {
    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8)
    };

    http.post({
        url: 'http://localhost:8000/user/register/',
        body: JSON.stringify(credentials),
        params: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    console.log(credentials);

}
//Neste exemplo, utilizamos a função randomString da biblioteca k6-utils para gerar strings aleatórias para o nome de usuário e senha
//Isso é útil para criar dados dinâmicos durante os testes de carga, evitando conflitos com dados existentes na API
//Gerar strings aleatórias ajuda a simular cenários mais realistas, onde cada usuário teria credenciais únicas
//Dessa forma, podemos testar a capacidade da API de lidar com múltiplos usuários e garantir que o sistema funcione corretamente sob carga variada
