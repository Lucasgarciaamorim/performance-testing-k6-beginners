import http from 'k6/http';
import { check } from 'k6';


export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}/`);

    console.log(res.json().name);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name': (r) => r.json().name === crocodileName
    });

}

//Neste código, fazemos uma requisição GET para obter a lista de crocodilos
//Extraímos o ID e o nome do primeiro crocodilo da lista
//Em seguida, fazemos uma segunda requisição GET para obter os detalhes desse crocodilo específico usando o ID extraído
//Usamos res.json() para analisar a resposta JSON e extrair o nome do crocodilo
//Também usamos a função check para validar que o status da resposta é 200 e que o nome do crocodilo corresponde ao nome extraído anteriormente
//Isso demonstra como correlacionar requisições em testes de carga com k6, utilizando dados dinâmicos obtidos de respostas anteriores
//A correlação é essencial para testar APIs que dependem de dados dinâmicos e relacionamentos entre recursos
//A função check é uma ferramenta poderosa para garantir que sua API esteja se comportando conforme o esperado
//Ao correlacionar requisições, podemos simular cenários de uso mais realistas e complexos em nossos testes de carga
//Isso ajuda a identificar problemas e gargalos em APIs que lidam com dados inter-relacionados