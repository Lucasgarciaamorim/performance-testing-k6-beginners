import http from 'k6/http';

export default function () {
    const baseUrl = __ENV.BASE_URL || 'http://localhost:8000';

    http.get(`${baseUrl}/public/crocodiles/`);
}

//neste exemplo, usamos uma variável de ambiente BASE_URL para definir a URL base da API
//Se a variável de ambiente não estiver definida, usamos um valor padrão 'http://localhost:8000'
//Isso permite que o script seja facilmente configurado para diferentes ambientes sem modificar o código-fonte diretamente
//Basta definir a variável de ambiente BASE_URL ao executar o k6 para apontar para a API desejada
//Usar variáveis de ambiente é uma prática recomendada para tornar os scripts mais flexíveis e reutilizáveis em diferentes contextos de teste
//Dessa forma, podemos facilmente alternar entre ambientes de desenvolvimento, teste e produção conforme necessário
//Isso também facilita a integração com pipelines de CI/CD, onde as variáveis de ambiente podem ser configuradas dinamicamente durante a execução dos testes
//Além disso, o uso de variáveis de ambiente ajuda a manter informações sensíveis, como URLs de APIs, fora do código-fonte, melhorando a segurança e a gestão das configurações
//Ao utilizar variáveis de ambiente, podemos adaptar nossos scripts de teste para diferentes cenários e requisitos sem a necessidade de alterações manuais no código
//Isso contribui para a eficiência e a eficácia dos testes de desempenho realizados com k6