import http from 'k6/http';



export default function () {
    const res = http.get('http://localhost:8000/public/crocodiles/');
    console.log(res)

}

//essa é uma requisição GET simples para a API de crocodilos
//utilizando o k6 para testes de carga
//o endpoint acessado é http://localhost:8000/public/crocodiles/
//o resultado da requisição é armazenado na variável res e impresso no console
//para executar esse script, use o comando: k6 run Making a GET request.js
