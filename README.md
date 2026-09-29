<img src="assets/header.gif" alt="Janela pixel art com o título The Unknown e estrelas cintilando" width="100%">

<h1>Kauan Di Nubila <img src="assets/wave.svg" width="40" height="40" align="absmiddle" alt="👋"></h1>

<p><strong>Desenvolvedor Back-End · Java &amp; Spring Boot</strong></p>

<p>
  <a href="https://kauan-dev-puce.vercel.app"><img src="https://img.shields.io/badge/PORTFÓLIO-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfólio"></a>
  <a href="https://www.linkedin.com/in/kauan-di-nubila-933562263/"><img src="https://img.shields.io/badge/LINKEDIN-000000?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="mailto:kauandinubila@gmail.com"><img src="https://img.shields.io/badge/E--MAIL-000000?style=for-the-badge&logo=gmail&logoColor=white" alt="E-mail"></a>
</p>

## Sobre mim

<img align="right" width="190" src="assets/galaxy.webp" alt="Galáxia em espiral">

Desenvolvedor back-end com foco em Java e Spring Boot, cursando Análise e Desenvolvimento de Sistemas. Tenho construído aplicações completas, desde a modelagem e desenvolvimento das APIs até testes, segurança, infraestrutura e deploy em produção.

Meu foco está no desenvolvimento de sistemas bem estruturados, com atenção a arquitetura, segurança, integração entre serviços e qualidade de código. Nos meus projetos, tenho explorado tanto arquiteturas modulares quanto microserviços, além de tecnologias como mensageria, comunicação em tempo real e cloud.

- **Dois produtos full-stack próprios em produção**: um em monólito modular e outro em microsserviços, com mensageria, circuit breaker, rate limiting e observabilidade.
- Experiência prática com desenvolvimento e operação de aplicações, incluindo Docker, CI/CD, testes automatizados, TLS e implementação de camadas de segurança com JWT, rotação de refresh tokens, RBAC e CSP.
- Português nativo, inglês avançado.

## Tecnologias

<img src="assets/tech.svg" alt="Tecnologias: Java, Spring, PostgreSQL, MySQL, Redis, Flyway, Kafka, RabbitMQ, Docker, GitHub Actions, JUnit, OpenAPI, Git, Maven, Linux, Cloudflare, React, TypeScript, Vercel" width="672">

## Estatísticas

<p>
  <img src="assets/stats.svg" alt="Estatísticas do GitHub" height="190">
  <img src="assets/streak.svg" alt="Sequência de contribuições" height="190">
</p>

<img src="assets/graph.svg" alt="Gráfico de contribuições dos últimos 30 dias" width="100%">

## Projetos em produção

<a href="https://github.com/KauanDiNubila/astra"><img src="assets/cartao-astra.svg" alt="Astra, ecossistema de estudos, monólito modular"></a>

<p>
  <a href="https://astra-app.dev"><img src="assets/btn-demo.svg" alt="Demo ao vivo do Astra" height="32"></a>
  <a href="https://github.com/KauanDiNubila/astra"><img src="assets/btn-codigo.svg" alt="Código do Astra no GitHub" height="32"></a>
</p>

**O que é**

- Sessões de foco (Pomodoro ou registro manual), com categorias e cursos
- Dashboard com metas, streak e heatmap de atividade
- Cursos com módulos, roadmaps de aprendizado e ranking social
- Chat em tempo real entre amigos
- Integração com o GitHub, que cruza commits, PRs e issues com o tempo estudado

**Como foi feito**

- Monólito modular por feature (usuário, sessões, cursos, roadmaps e estatísticas), com os módulos se comunicando só por serviços públicos
- Tudo o que é derivado (ranking, heatmap, streak e progresso) é calculado por agregação sobre a sessão, sem tabelas duplicadas
- Autenticação com JWT de acesso curto, refresh token em cookie `httpOnly` com rotação e detecção de reuso, login OAuth2 (Google e GitHub) e recusa de senhas vazadas
- Autorização por papéis, CSP restritiva e auditoria de segurança com OWASP ZAP
- Testes de integração com Testcontainers e CI no GitHub Actions
- Front-end na Vercel, API em uma VM na nuvem, Postgres serverless no Neon e Cloudflare na frente

`Java 21` `Spring Boot 4` `React` `PostgreSQL` `Flyway` `Docker` `Neon` `Vercel` `Cloudflare`

<br>

<a href="https://github.com/KauanDiNubila/lexo-backend"><img src="assets/cartao-lexo.svg" alt="Lexo, SaaS jurídico com IA, 9 microsserviços"></a>

<p>
  <a href="https://lexo-kauan1.duckdns.org"><img src="assets/btn-demo.svg" alt="Demo ao vivo do Lexo" height="32"></a>
  <a href="https://github.com/KauanDiNubila/lexo-backend"><img src="assets/btn-codigo.svg" alt="Código do Lexo no GitHub" height="32"></a>
</p>

**O que é**

- Gestão para escritórios de advocacia, multi-tenant: cada escritório acessa só os próprios dados
- Processos com andamentos, clientes, agenda de prazos e honorários
- IA com Google Gemini: resumo de processos, assistente jurídico e rascunho de petições
- Portal público do cliente por magic link, com processos, prazos e honorários

**Como foi feito**

- 9 serviços (gateway, discovery e sete de domínio), com API Gateway, Eureka e banco de dados isolado por serviço
- Comunicação síncrona com OpenFeign e assíncrona com Kafka para eventos de domínio e RabbitMQ para e-mails, com retry e dead-letter queue
- Resiliência com circuit breaker e fallback (Resilience4j), rate limiting com Redis e tracing distribuído com Zipkin
- O gateway valida o JWT e assina a identidade repassada aos serviços, que recusam requisições sem assinatura; rotas internas exigem chave de serviço
- Deploy na Oracle Cloud com HTTPS automático (Caddy e Let's Encrypt) e CI no GitHub Actions

`Java 21` `Spring Boot 3` `Spring Cloud` `Kafka` `RabbitMQ` `Redis` `PostgreSQL` `Gemini` `Docker` `React`

## Mais projetos

| Projeto | O que resolve | Stack |
|---|---|---|
| **[Ledger](https://github.com/KauanDiNubila/ledger)** | Importação em lote de transações financeiras: linha inválida é isolada com o motivo, o mesmo arquivo não entra duas vezes (hash SHA-256) e o volume é lido em *chunks* | Spring Batch, PostgreSQL |
| **[Codechella](https://github.com/KauanDiNubila/Codechella)** | API reativa de eventos e ingressos, usada para comparar desempenho reativo e bloqueante sob carga | WebFlux, R2DBC, Flyway |
| **[Gestão Financeira API](https://github.com/KauanDiNubila/gestao-financeira-api)** | Receitas e despesas com JWT, relatório mensal e gastos por categoria. [Demo](https://gestao-financeira-api-ss04.onrender.com) | Spring Boot, JPA, Docker |
| **[Nexus Roadmap](https://github.com/KauanDiNubila/nexusRoadmap)** | Trilha de estudos gamificada com árvore de tecnologias, XP e Pomodoro | Spring Boot, React Flow |

## Contato

Aberto a oportunidades como desenvolvedor. [LinkedIn](https://www.linkedin.com/in/kauan-di-nubila-933562263/) · [kauandinubila@gmail.com](mailto:kauandinubila@gmail.com)
