# A brief introduction to k6

Este resumo recapitula a história e as ideias-chave apresentadas na transcrição, e introduz o que é performance testing e por que usar o k6.

## História rápida (exemplo real)
Em 2013, ao lançar o site HealthCare.gov, o sistema recebeu muito mais tráfego do que o esperado — cerca de 250.000 usuários já no primeiro dia — e caiu poucas horas após o lançamento. No fim do dia apenas seis pessoas conseguiram completar o cadastro porque o mecanismo de login não suportou a carga. Esse caso ilustra por que testar desempenho antes de um lançamento é essencial.

## O que é performance testing?
Performance testing simula muitos usuários usando a aplicação ao mesmo tempo para avaliar se o sistema aguenta a carga, identificar gargalos e evitar surpresas em produção. Em vez de "cruzar os dedos" na hora do lançamento, testamos previamente com cargas controladas.

## Por que usar k6?
- k6 é uma ferramenta moderna para testes de desempenho escrita em JavaScript.
- Funciona pela linha de comando (CLI) — sem interface gráfica — o que a torna leve e fácil de integrar em pipelines.
- É open source e agora integrada ao ecossistema Grafana.
- Suporta protocolos web comuns (HTTP/HTTPS) e também protocolos modernos como gRPC, tornando-a adequada para testar APIs, microserviços e sites.
- A curva de aprendizado é relativamente rápida: para muitos cenários, você só precisa de um conhecimento básico de JavaScript.

## O que veremos neste curso
- Instalação e primeiro teste com k6 (hands-on).
- Conceitos de performance testing (terminologia e tipos de teste).
- Pequeno curso de JavaScript se necessário.
- Validação de respostas, assertions, thresholds e cenários mais avançados.
- Uso do k6 CLI e integração com Grafana Cloud.
- Integração com CI/CD (Jenkins, GitLab, CircleCI etc.).

## Conclusão
Testes de desempenho evitam falhas críticas em produção e ajudam a planejar escalabilidade. k6 é uma ótima opção prática para começar: scriptable em JavaScript, fácil de integrar em CI/CD e capaz de simular cargas reais para identificar problemas antes do lançamento.

Pronto para começar? Vamos ao primeiro teste.
