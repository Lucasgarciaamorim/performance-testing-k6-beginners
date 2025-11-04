import http from 'k6/http';
import { sleep, check, } from 'k6';
import exec from 'k6/execution';



export const options = {
    vus: 10, // número de usuários virtuais
    duration: '10s', // duração do teste
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% das requisições devem ser menores que 200ms
        http_req_duration: ['max<2000'], // duração máxima das requisições deve ser menor que 2000ms
        http_req_failed: ['rate<0.1'], // menos de 10% das requisições podem falhar
        http_reqs: ['rate>4'], // deve haver mais de 4 requisições por segundo
        vus: ['value>9'], // número máximo de usuários virtuais deve ser maior que 9
        checks: ['rate>=0.98'], // pelo menos 98% dos checks devem passar
    },
}

export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    console.log(exec.scenario.iterationInTest);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('QuickPizza Legacy')
    });
    sleep(2);
}

//Neste exemplo, além de monitorar várias métricas de desempenho, também definimos um threshold para os checks realizados durante o teste.
// A métrica `checks` rastreia a taxa de sucesso dos checks definidos no script, permitindo que você avalie a funcionalidade da aplicação sob carga.
// O threshold `checks: ['rate>=0.98']` garante que pelo menos 98% dos checks passem durante o teste, indicando que a aplicação está funcionando corretamente para a maioria dos usuários.
// Se a taxa de sucesso dos checks cair abaixo de 98%, o k6 marcará o teste como falho, ajudando você a identificar problemas funcionais que podem afetar a experiência do usuário.
// Isso é especialmente útil para garantir que, além do desempenho, a aplicação também mantenha sua funcionalidade esperada sob diferentes níveis de carga.
