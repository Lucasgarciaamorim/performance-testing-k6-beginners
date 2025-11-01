import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        {
            duration: '5m',
            target: 100, // ramp-up to 100 users over 5 minutes
        },
        {
            duration: '30m',
            target: 100, // ramp-up to 100 users over 30 minutes
        },
        {
            duration: '5min',
            target: 0, // ramp-up to 0 users over 5 minutes
        },
    ],
};

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);

    http.get('https://quickpizza.grafana.com/test.k6.io/contacts.php');
    sleep(2);

    http.get('https://quickpizza.grafana.com/test.k6.io/news.php');
    sleep(2);
}

//o teste de carga acima simula um aumento gradual na carga de usuários para avaliar como o sistema se comporta sob condições de alto tráfego.
// Ele ajuda a identificar gargalos de desempenho e garante que a aplicação possa lidar com as cargas de usuários esperadas.
// Testes de carga são particularmente úteis para determinar a robustez e estabilidade do sistema sob condições extremas, ajudando a identificar a carga máxima que o sistema pode suportar antes de falhar.
// Identificar o ponto de ruptura do sistema é crucial para garantir uma experiência de usuário confiável durante picos de tráfego.