import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now()
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

}

//Neste código, fazemos uma requisição POST para registrar um novo usuário em uma API
//Construímos o corpo da requisição como um objeto JavaScript e o convertemos para uma string JSON usando JSON.stringify()
//Definimos os cabeçalhos da requisição para indicar que o conteúdo é do tipo application/json
//Usamos http.post() para enviar a requisição POST com o corpo e os cabeçalhos especificados
//Isso demonstra como fazer requisições POST com k6, incluindo o envio de dados no corpo da requisição e a configuração de cabeçalhos apropriados
//As requisições POST são comumente usadas para criar novos recursos em APIs RESTful, como registrar usuários, criar posts, entre outros
//Entender como construir e enviar requisições POST é essencial para testar APIs que lidam com operações de criação e modificação de dados

