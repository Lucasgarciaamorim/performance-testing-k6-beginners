import http from 'k6/http';
import { Counter, Trend } from 'k6/metrics';
import { check, sleep } from 'k6';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<150'], // 95% das requisições devem ser menores que 150ms
        'http_req_duration{page:order}': ['p(95)<250'], // 95% das requisições para a página de pedidos devem ser menores que 250ms
        http_errors: ['count==0'], // menos de 1% das requisições podem falhar
        checks: ['rate>0.99'],
        'checks{page:order}': ['rate>0.99']// mais de 99% dos checks devem passar

    }
}
let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://36a3c1ce77d8487da6c6d71519289d83.api.mockbin.io/');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    //Submit order
    res = http.get(
        'https://422aef00d406483b8c7229f891579767.api.mockbin.io?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            },
        }
    );

    if (res.error) {
        httpErrors.add(1,{ page: 'order' });
    }
    check(res, { 'status is 201': (r) => r.status === 201 }, { page: 'order' });

    sleep(1);
}
//Neste exemplo, utilizamos tags para categorizar as requisições feitas durante o teste de carga.
// Adicionamos a tag `page: 'order'` às requisições relacionadas à página de pedidos, permitindo que definamos thresholds específicos para essas requisições.

// O threshold `http_req_duration{page:order}: ['p(95)<250']` monitora o tempo de resposta das requisições para a página de pedidos, garantindo que 95% delas sejam menores que 250ms.

// Também criamos uma métrica personalizada `http_errors` para contar o número de requisições que resultaram em erros, tanto para todas as requisições quanto especificamente para a página de pedidos.

// Definimos thresholds para a métrica `http_errors`, assegurando que o número total de erros seja zero.

// Além disso, utilizamos checks para validar as respostas das requisições, com thresholds que garantem que mais de 99% dos checks passem, tanto no geral quanto para a página de pedidos.

// Isso nos permite monitorar o desempenho e a confiabilidade da aplicação de forma mais granular, identificando possíveis problemas específicos relacionados à página de pedidos.

// Para mais informações sobre o uso de tags e thresholds no k6, consulte a documentação oficial: https://k6.io/docs/using-k6/thresholds/#using-tags-in-thresholds