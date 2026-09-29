<h1>Kauan Di Nubila</h1>

<p>
  <img src="assets/typing.svg" alt="Desenvolvedor Back-End Java; Spring Boot e Microsserviços; Astra e Lexo em produção" width="500" height="44">
</p>

<p>
  <a href="https://kauan-dev-puce.vercel.app"><img src="https://img.shields.io/badge/Portfólio-E4570E?style=flat-square&logo=vercel&logoColor=white" alt="Portfólio"></a>
  <a href="https://www.linkedin.com/in/kauan-di-nubila-933562263/"><img src="https://img.shields.io/badge/LinkedIn-111110?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="mailto:kauandinubila@gmail.com"><img src="https://img.shields.io/badge/E--mail-111110?style=flat-square&logo=gmail&logoColor=white" alt="E-mail"></a>
</p>

## Sobre

Desenvolvedor back-end com foco em **Java** e **Spring Boot**, cursando Análise e Desenvolvimento de Sistemas. Construo sistemas completos e coloco no ar.

- **Dois produtos full-stack próprios em produção**, um em microsserviços e outro em monólito modular, com mensageria, *circuit breaker*, *rate limiting* e observabilidade.
- **Infraestrutura real:** containers, TLS, CI/CD, testes automatizados e segurança em camadas (JWT com rotação de refresh token, RBAC, CSP).
- Português nativo, inglês avançado.

## Projetos em produção

| | |
|---|---|
| **[Astra](https://github.com/KauanDiNubila/astra)**<br>Ecossistema de estudos | Sessões de foco (Pomodoro ou manual), dashboard, metas, roadmaps, ranking social e chat em tempo real, tudo agregado sobre um único núcleo: a sessão. Monólito modular por feature; JWT curto com refresh em cookie `httpOnly`, rotação e detecção de reuso; senha recusada se vazada; CSP restritiva; auditoria com OWASP ZAP.<br><br>`Java 21` `Spring Boot 4` `React` `PostgreSQL` `Neon` `Vercel` `Cloudflare`<br>**[astra-app.dev](https://astra-app.dev)** |
| **[Lexo](https://github.com/KauanDiNubila/lexo-backend)**<br>SaaS jurídico em microsserviços | 9 serviços com API Gateway e Eureka, banco isolado por serviço, **Kafka** para eventos de domínio e **RabbitMQ** com *dead-letter queue*. *Circuit breaker* (Resilience4j), *rate limiting* no gateway, *tracing* distribuído (Zipkin) e identidade assinada entre serviços. IA com Google Gemini (resumo de processos, assistente, petições) e portal público do cliente por *magic link*. Deploy na Oracle Cloud com HTTPS automático.<br><br>`Java 21` `Spring Cloud` `Kafka` `RabbitMQ` `Redis` `PostgreSQL` `Gemini` `Docker`<br>**[lexo-kauan1.duckdns.org](https://lexo-kauan1.duckdns.org)** |

## Mais projetos

| Projeto | O que resolve | Stack |
|---|---|---|
| **[Ledger](https://github.com/KauanDiNubila/ledger)** | Importação em lote de transações financeiras: linha inválida é isolada com o motivo, o mesmo arquivo não entra duas vezes (hash SHA-256) e o volume é lido em *chunks* | Spring Batch, PostgreSQL |
| **[Codechella](https://github.com/KauanDiNubila/Codechella)** | API reativa de eventos e ingressos, usada para comparar desempenho reativo e bloqueante sob carga | WebFlux, R2DBC, Flyway |
| **[Gestão Financeira API](https://github.com/KauanDiNubila/gestao-financeira-api)** | Receitas e despesas com JWT, relatório mensal e gastos por categoria. [Demo](https://gestao-financeira-api-ss04.onrender.com) | Spring Boot, JPA, Docker |
| **[Nexus Roadmap](https://github.com/KauanDiNubila/nexusRoadmap)** | Trilha de estudos gamificada com árvore de tecnologias, XP e Pomodoro | Spring Boot, React Flow |

## Stack

| | |
|---|---|
| **Back-end** | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) ![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-6DB33F?style=flat-square&logo=spring&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white) ![WebFlux](https://img.shields.io/badge/WebFlux-6DB33F?style=flat-square&logo=spring&logoColor=white) |
| **Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Flyway](https://img.shields.io/badge/Flyway-CC0200?style=flat-square&logo=flyway&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) |
| **Mensageria** | ![Kafka](https://img.shields.io/badge/Kafka-111110?style=flat-square&logo=apachekafka&logoColor=white) ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) |
| **Qualidade** | ![JUnit 5](https://img.shields.io/badge/JUnit_5-25A162?style=flat-square&logo=junit5&logoColor=white) ![Mockito](https://img.shields.io/badge/Mockito-78A641?style=flat-square&logo=java&logoColor=white) ![Testcontainers](https://img.shields.io/badge/Testcontainers-111110?style=flat-square&logo=testcontainers&logoColor=white) ![OpenAPI](https://img.shields.io/badge/OpenAPI-85EA2D?style=flat-square&logo=swagger&logoColor=black) |
| **Infra** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![Oracle Cloud](https://img.shields.io/badge/Oracle_Cloud-F80000?style=flat-square&logo=oracle&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-111110?style=flat-square&logo=vercel&logoColor=white) |
| **Front-end** | ![React](https://img.shields.io/badge/React-149ECA?style=flat-square&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |

## Contato

Aberto a oportunidades como desenvolvedor back-end Java. [LinkedIn](https://www.linkedin.com/in/kauan-di-nubila-933562263/) · [kauandinubila@gmail.com](mailto:kauandinubila@gmail.com)
