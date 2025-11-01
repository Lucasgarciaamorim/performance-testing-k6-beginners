import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        {
            duration: '2h',
            target: 10000, // subida para 10000 usuários em 2 horas
        },


    ],
};

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);

}


// o teste de breakpoint acima simula um aumento gradual na carga de usuários para identificar o ponto de ruptura do sistema.
// Ele ajuda a determinar a capacidade máxima que o sistema pode suportar antes que o desempenho se degrade significativamente.
// para interromper o teste em qualquer ponto, você pode usar Ctrl+C no terminal onde o teste k6 está sendo executado.
// Isso permite observar o comportamento do sistema sob carga crescente e identificar o limite no qual ele começa a falhar ou experimentar desacelerações significativas.