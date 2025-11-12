import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '20s'
}


export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io');

    console.log('Thinking...');

    // Simula um tempo de pensamento (think time) aleatório entre 1 e 5 segundos
    const thinkTime = randomIntBetween(1, 5);
    sleep(thinkTime);

}
//O uso de tempos de pensamento (think time) aleatórios em scripts k6 ajuda a simular o comportamento real dos usuários, que não interagem com a aplicação de forma instantânea e contínua
//Ao introduzir pausas aleatórias entre as requisições, podemos replicar melhor os padrões de uso típicos, onde os usuários podem levar algum tempo para ler, pensar ou navegar antes de realizar a próxima ação
//Isso resulta em testes de carga mais realistas e precisos, permitindo identificar gargalos e problemas de desempenho que podem surgir sob condições de uso mais naturais
//Além disso, o uso de tempos de pensamento aleatórios ajuda a evitar picos artificiais de carga que podem ocorrer quando todos os usuários virtuais executam ações simultaneamente, proporcionando uma distribuição mais equilibrada das requisições ao longo do tempo
//Em resumo, incorporar tempos de pensamento aleatórios em scripts k6 é uma prática recomendada para melhorar a fidelidade dos testes de desempenho e obter insights mais valiosos sobre o comportamento da aplicação sob carga realista
//Isso contribui para a eficácia dos testes de desempenho e para a identificação de áreas que necessitam de otimização