import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';




export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        'http_req_duration': ['p(95)<250'], // 95% das requisições devem ser menores que 250ms
        'my_counter': ['count>10'], // o contador personalizado deve ser maior que 10
        'response_time_news_page': ['p(95)<150', 'p(99)<200'], // 95% das requisições para a página de notícias devem ser menores que 150ms
    },
};

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');


export default function () {
    let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    myCounter.add(1);
    sleep(2);

    res = http.get('https://quickpizza.grafana.com/news.php');


    newsPageResponseTrend.add(res.timings.duration);
}
//Neste exemplo prático, criamos duas métricas personalizadas: um contador (`my_counter`) e uma tendência (`response_time_news_page`).
// O contador `my_counter` rastreia o número total de requisições feitas durante o teste, enquanto a tendência `response_time_news_page` mede o tempo de resposta específico para a página de notícias.
// Definimos thresholds para ambas as métricas personalizadas, garantindo que o contador seja maior que 10 e que 95% das requisições para a página de notícias tenham um tempo de resposta inferior a 150ms.
// Isso nos permite monitorar eventos específicos e o desempenho de partes críticas da aplicação durante o teste de carga.
// Ao utilizar métricas personalizadas, podemos obter insights mais detalhados sobre o comportamento da aplicação sob carga e identificar áreas que precisam de melhorias.
// Métricas customizadas são especialmente úteis quando queremos rastrear eventos ou comportamentos específicos que não são cobertos pelas métricas padrão do k6.
// Para mais informações, consulte a documentação oficial do k6 sobre métricas personalizadas: https://k6.io/docs/using-k6/metrics/#custom-metrics