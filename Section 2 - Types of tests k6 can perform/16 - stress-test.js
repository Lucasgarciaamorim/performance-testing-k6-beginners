import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        {
            duration: '5m',
            target: 1000, //subida para 1000 usuários em 5 minutos
        },
        {
            duration: '30m',
            target: 1000, //subida para 1000 usuários em 30 minutos
        },
        {
            duration: '5min',
            target: 0, //subida para 0 usuários em 5 minutos
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


//o teste de estresse acima simula um aumento gradual na carga de usuários para avaliar como o sistema se comporta sob condições de alto tráfego.
// Ele ajuda a identificar gargalos de desempenho e garante que a aplicação possa lidar com as cargas de usuários esperadas.
// Testes de estresse são particularmente úteis para determinar a robustez e estabilidade do sistema sob condições extremas, ajudando a identificar a carga máxima que o sistema pode suportar antes de falhar.