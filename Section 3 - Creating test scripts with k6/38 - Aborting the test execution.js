import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';



export const options = {
    vus: 10,
    duration: '10s'

};

export function setup() {
    let res = http.get('https://test.k6.local/abort-endpoint');
    if (res.error) {
        exec.test.abort('Aborting test due to error');
    }
}
export default function () {
    http.get('https://test.k6.local/some-page-that-does-not-exist');
    sleep(1);
}
//Neste exemplo, utilizamos a função `exec.test.abort()` para abortar a execução do teste caso uma condição específica seja atendida durante a fase de setup.
// No exemplo, fazemos uma requisição HTTP para um endpoint específico (`/abort-endpoint`) e, se essa requisição resultar em um erro, chamamos `exec.test.abort()` com uma mensagem explicativa.
// Isso interrompe imediatamente a execução do teste, evitando que os usuários virtuais (VUs) continuem executando o script.
// Essa abordagem é útil quando você deseja garantir que certas condições sejam atendidas antes de prosseguir com o teste, como a disponibilidade de um serviço ou a configuração correta do ambiente.
