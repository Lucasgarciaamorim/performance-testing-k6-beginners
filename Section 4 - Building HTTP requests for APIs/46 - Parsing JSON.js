import http from 'k6/http';
import { check } from 'k6';


export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');

    res = http.get('http://localhost:8000/public/crocodiles/7/');

    console.log(res.json().name);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile is Sobek': (r) => r.json().name === 'Sobek'
    });

}
//Neste código, fazemos duas requisições GET para uma API de crocodilos
//A primeira requisição busca a lista completa de crocodilos
//A segunda requisição busca os detalhes do crocodilo com ID 7
//Usamos res.json() para analisar a resposta JSON e extrair o nome do crocodilo
//Também usamos a função check para validar que o status da resposta é 200 e que o nome do crocodilo é "Sobek"
//Isso demonstra como analisar respostas JSON e validar dados em testes de carga com k6
//A função check é uma ferramenta poderosa para garantir que sua API esteja se comportando conforme o esperado