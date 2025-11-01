import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('QuickPizza Legacy')

    });

}

//Neste exemplo, usamos a função check para validar as respostas HTTP recebidas durante o teste.
// A primeira verificação garante que o código de status da resposta seja 200, indicando que a solicitação foi bem-sucedida.
// A segunda verificação confirma que o corpo da resposta contém o texto 'QuickPizza Legacy', assegurando que a página correta foi carregada.
// Essas validações ajudam a garantir que a aplicação está respondendo conforme o esperado durante os testes de carga.
//Você pode adicionar mais verificações conforme necessário para validar outros aspectos das respostas, como tempos de resposta, cabeçalhos HTTP, ou conteúdo específico na página.
