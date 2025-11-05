import http from 'k6/http';
import { check } from 'k6';


export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}/`);

    console.log(res.headers['Content-Type']);



    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name': (r) => r.json().name === crocodileName
    });

}
//Neste código, fazemos uma requisição GET para obter a lista de crocodilos
// para identificar os cabeçalhos de resposta retornados pela API utilizamos res.headers
// extraímos o valor do cabeçalho Content-Type e o exibimos no console
// também usamos a função check para validar que o status da resposta é 200 e que o nome do crocodilo corresponde ao nome extraído anteriormente
// isso demonstra como acessar e utilizar os cabeçalhos de resposta em testes de carga com k6
// os cabeçalhos de resposta fornecem informações importantes sobre a resposta HTTP, como o tipo de conteúdo, codificação, políticas de cache, entre outros
// entender e validar os cabeçalhos de resposta é essencial para garantir que sua API esteja se comportando conforme o esperado