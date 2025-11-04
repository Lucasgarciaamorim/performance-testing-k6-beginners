import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';




export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        'http_req_duration': ['p(95)<250'], // 95% das requisições devem ser menores que 250ms
        'my_counter': ['count>10'], // o contador personalizado deve ser maior que 10
    },
};

let myCounter = new Counter('my_counter');


export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    myCounter.add(1);
    sleep(2);
}

//Neste exemplo, criamos uma métrica personalizada chamada `my_counter` usando a classe `Counter` do k6.
// Essa métrica conta o número de vezes que uma determinada ação ocorre durante o teste, neste caso, cada requisição HTTP feita.
// Definimos um threshold para essa métrica personalizada, garantindo que o valor do contador seja maior que 10 ao final do teste.
// Isso nos permite monitorar eventos específicos que são importantes para a nossa aplicação, além das métricas padrão fornecidas pelo k6.
// Ao utilizar métricas personalizadas, podemos obter insights mais detalhados sobre o comportamento da aplicação sob carga e identificar áreas que precisam de melhorias.
//metricas customizadas são especialmente úteis quando queremos rastrear eventos ou comportamentos específicos que não são cobertos pelas métricas padrão do k6.
//para mais informações, consulte a documentação oficial do k6 sobre métricas personalizadas: https://k6.io/docs/using-k6/metrics/#custom-metrics
