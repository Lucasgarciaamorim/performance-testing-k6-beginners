import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 10, // numero de usuarios virtuais
    duration: '10s', // duração do teste
};


export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
}




//Para rodar esse teste, salve-o como `First test with k6.js` e execute o seguinte comando no seu terminal:
//k6 run "First test with k6.js"
//Esse script realiza uma requisição GET simples para a URL especificada e espera 1 segundo entre as requisições.
//Ele serve como uma introdução básica para escrever e executar testes com k6.