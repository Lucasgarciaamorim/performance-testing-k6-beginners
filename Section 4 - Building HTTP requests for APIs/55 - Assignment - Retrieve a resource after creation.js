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
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    res = http.post(
        'http://localhost:8000/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
    const newCrocodileId = res.json().id;

    res = http.get(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile id': (r) => r.json().id === newCrocodileId
    });

}

//Neste código, após criar um novo recurso (crocodilo) usando uma requisição POST, fazemos uma requisição GET para recuperar esse recurso recém-criado
//Extraímos o ID do crocodilo criado a partir da resposta da requisição POST e o usamos para construir a URL da requisição GET
//Usamos a função check() do k6 para validar que a resposta da requisição GET tem um status 200 e que o ID do crocodilo na resposta corresponde ao ID do crocodilo que criamos
//Isso demonstra como recuperar um recurso específico após sua criação, o que é uma prática comum ao trabalhar com APIs RESTful
//Entender como criar e recuperar recursos é essencial para testar a funcionalidade completa de APIs que lidam com operações de criação e leitura de dados