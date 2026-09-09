<h1 align="center">Kauan Di Nubila</h1>

<p align="center">
  <strong>Desenvolvedor Back-end · Java &amp; Spring Boot</strong>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/kauan-di-nubila-933562263/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:kauandinubila@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
</p>

---

### Sobre mim

Desenvolvedor back-end com foco em **Java** e **Spring Boot**, cursando Análise e Desenvolvimento de Sistemas. Construo sistemas completos do código ao deploy.

- Dois produtos full-stack próprios **em produção**: arquitetura de microsserviços/monólito modular, mensageria (Kafka, RabbitMQ), *circuit breaker*, *rate limiting* e observabilidade.
- Deploy e operação de infraestrutura real: containers, TLS, CI/CD, testes automatizados e hardening de segurança (JWT com rotação, RBAC, CSP).
- Português (nativo) e Inglês (avançado).

---

### Tecnologias

**Linguagem & Frameworks**

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

**Persistência & Banco de Dados**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Flyway](https://img.shields.io/badge/Flyway-CC0200?style=for-the-badge&logo=flyway&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**Mensageria**

![Kafka](https://img.shields.io/badge/Apache_Kafka-000000?style=for-the-badge&logo=apachekafka&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)

**Segurança & APIs**

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![OAuth2](https://img.shields.io/badge/OAuth2-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger/OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

**Testes**

![JUnit5](https://img.shields.io/badge/JUnit_5-25A162?style=for-the-badge&logo=junit5&logoColor=white)
![Mockito](https://img.shields.io/badge/Mockito-78A641?style=for-the-badge&logo=java&logoColor=white)

**DevOps & Ferramentas**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

**Cloud & Deploy**

![Oracle Cloud](https://img.shields.io/badge/Oracle_Cloud-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

---

### Projetos em destaque

#### [Astra — Ecossistema de Estudos](https://github.com/KauanDiNubila/astra)

Ecossistema de estudos full-stack (**Java** com **Spring Boot** + **React**) em produção: sessões de foco com Pomodoro ou registro manual, dashboard, metas, roadmaps de aprendizado, ranking social e chat em tempo real, tudo agregado sobre um único núcleo de dados. Back-end em **monólito modular por feature** e segurança em camadas — JWT de acesso curto, refresh token com rotação e detecção de reuso, RBAC reavaliado a cada requisição, recusa de senhas vazadas e CSP restritiva — validada por auditoria automatizada (**OWASP ZAP**). Infraestrutura própria de ponta a ponta: VM na nuvem, **Vercel**, Postgres serverless (**Neon**) e **Cloudflare**.

`Java 21` · `Spring Boot` · `React` · `PostgreSQL (Neon)` · `JWT` · `Vercel` · `Cloudflare`

**Demo ao vivo:** [astra-app.dev](https://astra-app.dev)

<br>

#### [Lexo — Plataforma Jurídica em Microsserviços (Full-Stack + IA)](https://github.com/KauanDiNubila/lexo-backend)

SaaS de gestão para escritórios de advocacia em **arquitetura de microsserviços** (9 serviços, com API Gateway e *service discovery*), com banco isolado por serviço, mensageria (**Kafka** para eventos de domínio e **RabbitMQ** com *dead-letter queue*), resiliência com *circuit breaker*, *rate limiting* no gateway e *tracing* distribuído (Zipkin). Integra **IA de verdade** (Google Gemini) para resumo de processos, assistente jurídico e geração de petições, além de um **portal público do cliente** (*magic link*) e **frontend React** completo. Deploy real em produção na Oracle Cloud, com HTTPS automático (Caddy + Let's Encrypt) e CI no GitHub Actions.

`Java 21` · `Spring Boot` · `Spring Cloud` · `OpenFeign` · `Kafka` · `RabbitMQ` · `Redis` · `PostgreSQL` · `Google Gemini` · `React` · `Docker Compose`

**Demo ao vivo:** [lexo-kauan1.duckdns.org](https://lexo-kauan1.duckdns.org)

---

<!--
  (Opcional) Estatísticas do GitHub — descomente quando tiver mais atividade no perfil.
  Hoje a conta é nova, então os números ainda aparecem baixos; vale ativar mais pra frente.

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=KauanDiNubila&show_icons=true&theme=default&hide_border=true" alt="Estatisticas do GitHub" />
</p>
-->
