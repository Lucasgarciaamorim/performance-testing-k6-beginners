import http from 'k6/http';
import { check, sleep } from 'k6';



export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<150'], // 95% das requisições devem ser menores que 150ms
        'http_req_failed': ['rate<0.01'], // menos de 1% das requisições podem falhar
    },
};

export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('QuickPizza Legacy')

    });
    sleep(1);

}

//Neste exemplo, definimos dois thresholds para monitorar durante o teste de carga.
// O primeiro threshold garante que 95% das requisições tenham uma duração inferior a 150ms, o que ajuda a manter um desempenho aceitável para os usuários.
// O segundo threshold assegura que a taxa de requisições falhadas seja inferior a 1%, indicando que a aplicação está funcionando corretamente sob carga.
// Se algum desses thresholds for violado durante o teste, o k6 marcará o teste como falho, permitindo que você identifique e corrija problemas de desempenho ou estabilidade na aplicação.
// Você pode ajustar os valores dos thresholds conforme necessário para atender aos requisitos específicos de desempenho da sua aplicação.
