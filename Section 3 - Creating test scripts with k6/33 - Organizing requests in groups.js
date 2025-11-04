import http from 'k6/http';
import { sleep, group, check } from 'k6';



export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<250'], // 95% das requisições devem ser menores que 250ms
        'http_req_duration{group:Main page}': ['p(95)<500'], // 95% da duração do grupo "Main page" deve ser menor que 500ms
        'http_req_duration{name:News page}': ['p(95)<300'] // 95% da duração do grupo "News page" deve ser menor que 300ms
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css'),
                { tags: { name: 'Main page assets' } };

        });
    });

    group('News page', function () {
        http.get('https://quickpizza.grafana.com/news.php'),
            { tags: { name: 'News page' } };

    });


    sleep(2);

}

//Neste exemplo, organizamos nossas requisições HTTP em grupos usando a função `group` do k6.
// Criamos dois grupos principais: "Main page" e "News page", cada um contendo requisições relacionadas a essas páginas específicas.
// Definimos thresholds para monitorar a duração das requisições dentro desses grupos, permitindo uma análise mais granular do desempenho da aplicação.
// O threshold `http_req_duration{group:Main page}: ['p(95)<500']` garante que 95% das requisições dentro do grupo "Main page" tenham uma duração inferior a 500ms.
// Da mesma forma, o threshold `http_req_duration{name:News page}: ['p(95)<300']` assegura que 95% das requisições dentro do grupo "News page" sejam menores que 300ms.
// Isso nos ajuda a identificar possíveis gargalos de desempenho em partes específicas da aplicação, facilitando a otimização e melhoria da experiência do usuário.
// Para mais informações sobre como organizar requisições em grupos e definir thresholds no k6, consulte a documentação oficial: https://k6.io/docs/using-k6/groups/ e https://k6.io/docs/using-k6/thresholds/#using-groups-in-thresholds

