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
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
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

    res = http.put(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Updated Random croc',
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

    res = http.patch(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    res = http.del(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

}

////Neste código, após criar um novo recurso (crocodilo) usando uma requisição POST, fazemos uma requisição GET para recuperar esse recurso recém-criado
//Extraímos o ID do crocodilo criado a partir da resposta da requisição POST e o usamos para construir a URL da requisição GET
//Usamos a função check() do k6 para validar que a resposta da requisição GET tem um status 200 e que o ID do crocodilo na resposta corresponde ao ID do crocodilo que criamos
//Isso demonstra como recuperar um recurso específico após sua criação, o que é uma prática comum ao trabalhar com APIs RESTful
//Entender como criar e recuperar recursos é essencial para testar a funcionalidade completa de APIs que lidam com operações de criação e leitura de dados
//Além disso, este exemplo mostra como atualizar um recurso existente usando uma requisição PUT, que é uma operação comum em APIs RESTful
//Testar a atualização de recursos garante que as modificações nos dados sejam corretamente aplicadas e refletidas na API
//Essas práticas são fundamentais para garantir a integridade e a confiabilidade das operações CRUD (Create, Read, Update, Delete) em APIs RESTful
//A compreensão de como construir e enviar requisições PUT, juntamente com POST e GET, é crucial para testar completamente as funcionalidades de uma API
//Além disso, este exemplo demonstra como fazer uma requisição PATCH para modificar parcialmente um recurso existente
//A requisição PATCH é útil quando queremos atualizar apenas alguns campos de um recurso sem precisar enviar todos os dados novamente
//Testar requisições PATCH é importante para garantir que as atualizações parciais sejam aplicadas corretamente e que a API lide adequadamente com essas operações
//Compreender como construir e enviar requisições PATCH, juntamente com outras operações HTTP, é vital para testar a funcionalidade completa de APIs RESTful que suportam modificações parciais de recursos
//Isso contribui para a robustez e a confiabilidade das APIs ao lidar com diferentes tipos de operações de atualização de dados
//Finalmente, este exemplo mostra como fazer uma requisição DELETE para remover o recurso criado anteriormente
//A requisição DELETE é usada para excluir recursos em APIs RESTful
//Testar a funcionalidade de exclusão é crucial para garantir que os recursos possam ser removidos conforme necessário e que a API lide corretamente com essas operações
//Compreender como construir e enviar requisições DELETE, juntamente com outras operações CRUD, é essencial para testar completamente as funcionalidades de uma API RESTful
//Isso assegura que a API mantenha a integridade dos dados e permita a gestão adequada dos recursos ao longo do tempo