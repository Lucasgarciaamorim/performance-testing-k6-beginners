import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% das requisições devem ser menores que 1000ms
        'http_req_duration{status:200}': ['p(95)<500'], // 95% das requisições com status 200 devem ser menores que 500ms
        'http_req_duration{status:201}': ['p(95)<500'] // 95% das requisições com status 201 devem ser menores que 500ms
    },
};
export default function () {
    http.get('https://36a3c1ce77d8487da6c6d71519289d83.api.mockbin.io/');
    http.get('https://422aef00d406483b8c7229f891579767.api.mockbin.io?mocky-delay=2000ms');


}

//Neste exemplo, definimos thresholds específicos para diferentes grupos de requisições com base em seus códigos de status HTTP.
// Utilizamos etiquetas (tags) para categorizar as requisições: as requisições que retornam o status 200 e as que retornam o status 201.
// Cada grupo de requisições tem seu próprio threshold para a métrica `http_req_duration`, permitindo monitorar o desempenho de forma mais granular.
// O threshold `http_req_duration{status:200}: ['p(95)<500']` garante que 95% das requisições com status 200 tenham uma duração inferior a 500ms.
// Da mesma forma, o threshold `http_req_duration{status:201}: ['p(95)<500']` assegura que 95% das requisições com status 201 também sejam menores que 500ms.
// Isso é útil para identificar problemas de desempenho específicos relacionados a diferentes tipos de respostas da aplicação, ajudando a garantir uma experiência consistente para os usuários finais.
// Para mais informações sobre o uso de tags e thresholds no k6, consulte a documentação oficial: https://k6.io/docs/using-k6/thresholds/#using-tags-in-thresholds