import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1, // numero de usuarios virtuais
    duration: '10s', // duração do teste
};

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);

    http.get('https://quickpizza.grafana.com/test.k6.io/contacts.php');
    sleep(2);

    http.get('https://quickpizza.grafana.com/test.k6.io/news.php');
    sleep(2);
}


//o teste de fumaça acima realiza uma verificação rápida para garantir que as principais páginas da aplicação estão acessíveis e responsivas.
// Ele é projetado para detectar problemas graves antes de prosseguir com testes mais extensos.
// Testes de fumaça são normalmente executados após implantações para verificar se a aplicação está funcionando corretamente.
