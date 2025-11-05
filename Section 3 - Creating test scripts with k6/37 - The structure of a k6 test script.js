import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    vus: 2,
    duration: '5s'
}

console.log(' --- Init Stage --- ');

export function setup() {
    console.log(' --- Setup Stage --- ');
}
export default function () {
    console.log(' --- VU Stage --- ');

}

export function teardown() {
    console.log(' --- Teardown Stage --- ');
}

// Neste exemplo, mostramos a estrutura básica de um script de teste k6.
// O script é dividido em quatro partes principais: configuração (options), inicialização (init stage), execução do teste (VU stage) e finalização (teardown stage).
// A seção de configuração define o número de usuários virtuais (VUs) e a duração do teste.
// A seção de inicialização é executada uma vez antes do início do teste e pode ser usada para configurar pré-requisitos.
// A função principal (default) é onde o código do teste é executado por cada VU durante a duração do teste.
// A seção de finalização é executada uma vez após o término do teste e pode ser usada para limpar recursos ou gerar relatórios finais.
// Essa estrutura modular facilita a organização e manutenção dos scripts de teste k6.
// Para mais informações sobre a estrutura dos scripts k6, consulte a documentação oficial: https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/