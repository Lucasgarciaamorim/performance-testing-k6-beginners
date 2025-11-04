import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
    vus: 10, // número de usuários virtuais
    duration: '10s', // duração do teste
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% das requisições devem ser menores que 200ms
        http_req_duration: ['max<2000'], // duração máxima das requisições deve ser menor que 2000ms
        http_req_failed: ['rate<0.1'], // menos de 10% das requisições podem falhar
        http_reqs: ['rate>4'], // deve haver mais de 4 requisições por segundo
        vus: ['value>9'], // número máximo de usuários virtuais deve ser maior que 9
    },
}

export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body.length > 0,
    });
    sleep(1);
}

//Neste exemplo, definimos várias métricas personalizadas para monitorar durante o teste de carga.
// A métrica `http_req_duration` mede o tempo de duração das requisições HTTP, permitindo que você avalie o desempenho do servidor sob carga.
// A métrica `http_req_failed` rastreia a taxa de requisições que falharam, ajudando a identificar problemas de estabilidade na aplicação.
// A métrica `http_reqs` conta o número total de requisições feitas durante o teste, fornecendo insights sobre a carga gerada pelo teste.
// A métrica `vus` monitora o número de usuários virtuais ativos durante o teste, permitindo que você veja como a aplicação se comporta com diferentes níveis de concorrência.
// Essas métricas são essenciais para entender o desempenho e a resiliência da aplicação sob diferentes condições de carga.
