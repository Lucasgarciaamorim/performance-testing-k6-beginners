import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');

    const crocodiles = res.json();
    const crocodilesIds = crocodiles.map(crocodile => crocodile.id);
    const crocodilesId = randomItem(crocodilesIds);

    res = http.get(`http://localhost:8000/public/crocodiles/${crocodilesId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile id': (r) => r.json().id === crocodilesId
    });
}

//Neste exemplo, usamos a função randomItem para selecionar um ID de crocodilo aleatório do array de IDs obtidos da resposta da API
//Em seguida, fazemos uma requisição GET para recuperar os detalhes do crocodilo correspondente a esse ID aleatório
//Usamos a função check() do k6 para validar que a resposta da requisição GET tem um status 200 e que o ID do crocodilo na resposta corresponde ao ID selecionado aleatoriamente
//Testar com itens aleatórios é útil para garantir que a API funcione corretamente para diferentes entradas e cenários, aumentando a cobertura dos testes e identificando possíveis problemas que possam surgir com dados variados
//Isso contribui para a robustez e a confiabilidade das APIs ao lidar com diferentes conjuntos de dados