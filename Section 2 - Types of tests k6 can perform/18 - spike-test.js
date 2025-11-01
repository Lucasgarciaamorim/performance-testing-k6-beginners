import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        {
            duration: '2m',
            target: 10000, // subida para 10000 usuários em 2 minutos
        },

        {
            duration: '1m',
            target: 0, // subida para 0 usuários em 1 minuto
        },
    ],
};

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);

}

// the spike test script above simulates a sudden increase in user load to evaluate how the system handles unexpected traffic spikes.
// It helps identify how well the application can scale and respond to rapid changes in demand.
// Spike testing is crucial for applications that may experience sudden surges in traffic, such as during promotional events or viral content sharing.

//o teste de spike acima simula um aumento repentino na carga de usuários para avaliar como o sistema lida com picos inesperados de tráfego.
// Ele ajuda a identificar quão bem a aplicação pode escalar e responder a mudanças rápidas na demanda.
// Testes de spike são cruciais para aplicações que podem experimentar surtos repentinos de tráfego, como durante eventos promocionais ou compartilhamento viral de conteúdo.
