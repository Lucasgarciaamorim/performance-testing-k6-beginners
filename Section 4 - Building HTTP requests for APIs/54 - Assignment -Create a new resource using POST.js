import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    http.post(
        'http://localhost:8000/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let res = http.post(
        'http://localhost:8000/auth/token/login/',
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


    http.get(
        'http://localhost:8000/my/crocodiles/',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }

    )

    http.post('http://localhost:8000/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Crocodilo Teste',
                sex: 'M',
                date_of_birth: '2015-06-01',
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',

            }

        }
    );

}

//Neste código, fazemos uma requisição POST para registrar um novo usuário em uma API de teste
//Construímos o corpo da requisição como um objeto JavaScript e o convertemos para uma string JSON usando JSON.stringify()
//Definimos os cabeçalhos da requisição para indicar que o conteúdo é do tipo application/json
//Usamos http.post() para enviar a requisição POST com o corpo e os cabeçalhos especificados
//Após o registro, fazemos outra requisição POST para autenticar o usuário recém-registrado e obter um token de acesso
//Extraímos o token de acesso da resposta JSON usando res.json().access e o exibimos no console
//Em seguida, fazemos uma requisição GET para buscar uma lista de crocodilos, incluindo o token de acesso no cabeçalho Authorization
//Finalmente, fazemos uma requisição POST para criar um novo recurso de crocodilo, enviando os dados necessários no corpo da requisição e incluindo o token de acesso no cabeçalho Authorization
//Isso demonstra como fazer requisições POST com k6, incluindo o envio de dados no corpo da requisição, a configuração de cabeçalhos apropriados e o manuseio de respostas JSON
//As requisições POST são comumente usadas para criar novos recursos em APIs RESTful, como registrar usuários, criar posts, entre outros
//Entender como construir e enviar requisições POST, bem como lidar com autenticação e tokens de acesso, é essencial para testar APIs que lidam com operações de criação e modificação de dados
//Além disso, este exemplo mostra como trabalhar com dados dinâmicos, como nomes de usuário e senhas gerados com base no timestamp atual, para evitar conflitos durante os testes repetidos




