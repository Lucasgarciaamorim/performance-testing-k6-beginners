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
        let res = http.get('https://36a3c1ce77d8487da6c6d71519289d83.api.mockbin.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://be621231c34d4197b855e13b5665206e.api.mockbin.io/')
            http.get('https://e826ae6e725e4cd9bceb16fc78796dcd.api.mockbin.io/')


        });
    });

    group('News page', function () {
        http.get('https://923821416e1a4d4f833a72c19dbad601.api.mockbin.io/'),
            { tags: { name: 'News page' } };

    });


    sleep(2);

}
//Neste exemplo, organizamos nossas requisições HTTP em grupos usando a função `group` do k6.
// Criamos dois grupos principais: "Main page" e "News page", cada um contendo requisições relacionadas a essas páginas específicas.
// Definimos thresholds para monitorar a duração das requisições dentro desses grupos, permitindo uma análise mais granular do desempenho da aplicação.
// O threshold `group_duration{group:::Main page}: ['p(95)<700']` garante que 95% das requisições dentro do grupo "Main page" tenham uma duração inferior a 700ms.
// Da mesma forma, o threshold `group_duration{group:::Main page::Assets}: ['p(95)<700']` assegura que 95% das requisições dentro do subgrupo "Main page::Assets" sejam menores que 700ms.
// O threshold `group_duration{group:::News page}: ['p(95)<500']` garante que 95% das requisições dentro do grupo "News page" tenham uma duração inferior a 500ms.
// Isso nos ajuda a identificar possíveis gargalos de desempenho em partes específicas da aplicação, facilitando a otimização e melhoria da experiência do usuário.
// Para mais informações sobre como organizar requisições em grupos e definir thresholds no k6, consulte a documentação oficial: https://k6.io/docs/using-k6/groups/ e https://k6.io/docs/using-k6/thresholds/#using-groups-in-thresholds