import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    console.log(accessToken);
}
//Neste código, fazemos uma requisição POST para registrar um novo usuário em uma API de teste
//Construímos o corpo da requisição como um objeto JavaScript e o convertemos para uma string JSON usando JSON.stringify()
//Definimos os cabeçalhos da requisição para indicar que o conteúdo é do tipo application/json
//Usamos http.post() para enviar a requisição POST com o corpo e os cabeçalhos especificados
//Após o registro, fazemos outra requisição POST para autenticar o usuário recém-registrado e obter um token de acesso
//Extraímos o token de acesso da resposta JSON usando res.json().access e o exibimos no console
//Isso demonstra como fazer requisições POST com k6, incluindo o envio de dados no corpo da requisição, a configuração de cabeçalhos apropriados e o manuseio de respostas JSON
//As requisições POST são comumente usadas para criar novos recursos em APIs RESTful, como registrar usuários, criar posts, entre outros
//Entender como construir e enviar requisições POST, bem como lidar com autenticação e tokens de acesso, é essencial para testar APIs que lidam com operações de criação e modificação de dados
//Além disso, este exemplo mostra como trabalhar com dados dinâmicos, como nomes de usuário e senhas gerados com base no timestamp atual, para evitar conflitos durante os testes repetidos