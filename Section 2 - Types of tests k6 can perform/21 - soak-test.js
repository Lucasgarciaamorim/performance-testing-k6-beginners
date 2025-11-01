import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        {
            duration: '5m',
            target: 1000, // subida para 1000 usuários em 5 minutos
        },
        {
            duration: '8h',
            target: 1000, // subida para 1000 usuários em 8 horas
        },
        {
            duration: '5min',
            target: 0, // subida para 0 usuários em 5 minutos
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

// o teste de soak acima simula um aumento gradual na carga de usuários para avaliar como o sistema se comporta sob condições de tráfego sustentado.
// Ele ajuda a identificar gargalos de desempenho e garante que a aplicação possa lidar com as cargas de usuários esperadas.
// Testes de soak são particularmente úteis para identificar problemas que podem não ser aparentes durante testes mais curtos, como vazamentos de memória, limites de conexão de banco de dados e outros problemas de exaustão de recursos que podem ocorrer ao longo de períodos prolongados de operação.