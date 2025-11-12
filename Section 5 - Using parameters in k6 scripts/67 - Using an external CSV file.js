import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


const userCredentials = new SharedArray('users with credentials', () => {
    return papaparse.parse(open('users.csv'), { header: true }).data;
});


export default function () {

    userCredentials.forEach((item) => {
        console.log(`Username: ${item.username} | Password: ${item.password}`);
    });
}

// Neste exemplo, utilizamos o SharedArray para carregar um arquivo CSV externo chamado 'users.csv', que contém uma lista de usuários com suas credenciais (username e password).
// A função exportada itera sobre cada conjunto de credenciais e imprime o nome de usuário e a senha no console.
// O uso do SharedArray otimiza o desempenho, evitando a leitura repetida do arquivo durante a execução dos VUs (Virtual Users).
// A biblioteca PapaParse é utilizada para analisar o arquivo CSV, facilitando a extração dos dados em um formato utilizável.
// Esse padrão é útil para testar sistemas que exigem autenticação, garantindo que múltiplos usuários possam acessar o sistema simultaneamente.