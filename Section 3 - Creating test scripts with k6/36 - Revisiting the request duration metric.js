import http from 'k6/http';
import { sleep, group, check } from 'k6';



export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<700'], // 95% das requisições devem ser menores que 700ms
        'group_duration{group:::Main page}': ['p(95)<700'],// 95% da duração do grupo "Main page" deve ser menor que 700ms
        'group_duration{group:::Main page::Assets}': ['p(95)<700'], // 95% da duração do grupo "Main page::Assets" deve ser menor que 700ms
        'group_duration{group:::News page}': ['p(95)<500'] // 95% da duração do grupo "News page" deve ser menor que 500ms

    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css')
            //  http.get('https://e826ae6e725e4cd9bceb16fc78796dcd.api.mockbin.io/')


        });
    });

    group('News page', function () {
        http.get('https://d5f62f64f98b42c89abd5e0d90cd7400.api.mockbin.io/'),
            { tags: { name: 'News page' } };

    });


    sleep(2);

}
