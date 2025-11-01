import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test.k6.io');
    check(true, {
        'true is true': (value) => value === true,
      });

}





//nós usamos a função check para escrever asserções em k6.
// Neste exemplo, realizamos uma asserção simples que verifica se o valor true é realmente true.
// Você pode expandir isso adicionando verificações mais complexas com base nos requisitos do seu teste, como verificar códigos de status de resposta ou tempos de resposta.
// A função check recebe dois argumentos: o primeiro é o valor a ser verificado, e o segundo é um objeto onde cada chave é uma descrição da verificação e o valor correspondente é uma função que retorna um booleano indicando se a verificação passou ou falhou.
// Isso permite validar várias condições durante seus testes e garantir que sua aplicação se comporte conforme o esperado.

