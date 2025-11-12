import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const userCredentials = new SharedArray('users with credentials', () => {
    return JSON.parse(open('users.json')).users; // [{ username, password }, ...]
});

/*export default function () {
    userCredentials.forEach((item) => {
        const res = http.post(
            'http://localhost:8000/user/register/',
            JSON.stringify({ username: item.username, password: item.password }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        check(res, { 'status is 201': (r) => r.status === 201 });
    });
}
    */

export default function () {

    const randomCredential = randomItem(userCredentials);

    let res = http.post(
        'http://localhost:8000/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });

    const accessToken = res.json().access;

}

// Neste código, usamos o SharedArray para carregar um arquivo JSON externo chamado 'users.json', que contém uma lista de usuários com suas credenciais. A função exportada seleciona aleatoriamente um conjunto de credenciais e faz uma solicitação POST para o endpoint de login, verificando se a resposta é bem-sucedida e se contém um token de acesso.
// Isso permite que os testes de carga sejam realizados com diferentes usuários, simulando cenários mais realistas.
// O uso do SharedArray otimiza o desempenho, evitando a leitura repetida do arquivo durante a execução dos VUs (Virtual Users).
// A função randomItem é utilizada para selecionar aleatoriamente um conjunto de credenciais do array carregado, garantindo diversidade nas requisições de login.
// A verificação da resposta com a função check assegura que o endpoint de autenticação está funcionando corretamente e retornando os dados esperados.
//// Esse padrão é útil para testar sistemas que exigem autenticação, garantindo que múltiplos usuários possam acessar o sistema simultaneamente.