import http from 'k6/http';



export default function () {
    const res = http.get('http://localhost:8000/public/crocodiles/');


}


//pra rodar como debug use o comando: k6 run --http-debug="full" Debugging HTTP requests and responses.js
//a resposta da requisição GET para o endpoint de crocodilos será exibida no console
//com detalhes completos da requisição e resposta HTTP
//isso ajuda a identificar problemas e entender o comportamento da API durante os testes de carga
