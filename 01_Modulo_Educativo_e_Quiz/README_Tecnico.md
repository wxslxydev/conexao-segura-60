# Conexão Segura 60+

**Tema:** Segurança em compras online para pessoas idosas: identificação de lojas falsas, anúncios fraudulentos e golpes em marketplaces.

## Escopo
O módulo aborda a jornada de compra pela internet: loja e anúncio, vendedor/marketplace, pagamento e entrega. Não tem como foco golpes genéricos por WhatsApp, falsas centrais bancárias ou phishing fora do contexto de uma compra online.

> Observação: o plano docente permite propor novos temas, desde que não haja duplicidade. A confirmação de que este recorte não conflita com outra squad deve ser feita com o professor.

## Executar localmente
1. Instale Node.js 18 ou superior.
2. Abra o terminal nesta pasta.
3. Execute `npm install`.
4. Execute `npm start`.
5. Acesse `http://localhost:3000`.

Para verificar a API, acesse `http://localhost:3000/api/health`.

## Arquitetura
- `site/index.html`: estrutura e conteúdo educativo.
- `site/style.css`: identidade visual e responsividade.
- `site/script.js`: navegação e envio do quiz.
- `server.js`: servidor Express e rotas HTTP.
- `backend/perguntas.js`: gabarito e feedback do quiz.

A rota `POST /api/quiz` recebe as alternativas em JSON e devolve correção e pontuação. A rota `GET /api/health` verifica a disponibilidade. As respostas do quiz não são armazenadas.

## Entregas acadêmicas previstas no plano docente
1. Página/módulo estático com conteúdo didático, exemplos e dicas de prevenção.
2. Produto interativo: quiz leve em HTML/CSS/JavaScript.
3. Artigo científico sobre o tema.

A apresentação integra o encerramento previsto no cronograma docente. O backend é uma decisão técnica complementar, não uma entrega independente exigida pelo plano.

## Aderência ao plano docente
- O módulo estático e o quiz são as entregas digitais implementadas.
- A integração HTTP completa do Express e a conferência em dispositivo físico devem ser realizadas no computador de entrega.
- O artigo científico está incluído em versão revisada, com método, discussão e limitações coerentes com o protótipo. Conferir o modelo exigido pela universidade e executar a verificação institucional de similaridade.
- O relatório de avaliação simulada orientada por tarefas está incluído em `Relatorio_Testes_Usabilidade_Acessibilidade_Simulados.docx`. Foram usados três perfis fictícios; não houve participantes reais.
- A seção 4 do plano lista vídeo, jogo/interativo e imagens como formatos possíveis; contudo, a Sprint 3 menciona “rascunho de vídeo”. A aplicabilidade desse item deve ser confirmada com o professor.
- O plano exige entregas semanais. Registrar as datas e evidências de cada sprint no `CHECKLIST_FINAL.txt`.
- A execução individual foi autorizada pelo professor; a documentação de planejamento e acompanhamento deve ser mantida.

## Fontes principais
- CERT.br/NIC.br/CGI.br: https://cartilha.cert.br/fasciculos/comercio-via-internet/fasciculo-comercio-via-internet-alta.pdf
- Receita Federal: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/e-golpe/compras-em-redes-sociais/compras-em-redes-sociais
- Senacon: https://www.gov.br/mj/pt-br/assuntos/noticias/senacon-explica-como-evitar-fraudes-em-compras-on-line
- Procon-SP (alerta Pix): https://www.procon.sp.gov.br/procon-sp-orienta-consumidores-sobre-novo-golpe-que-altera-qr-code-do-pix-em-compras-online/
- Procon-SP (pessoa idosa): https://www.procon.sp.gov.br/pessoa-idosa-x-mercado-de-consumo-consulta-do-procon-sp-indica-que-mais-da-metade-da-populacao-60-tem-alguma-dificuldade-em-compras-on-line/
- Ministério dos Direitos Humanos e da Cidadania – Acessibilidade digital: https://www.gov.br/mdh/pt-br/assuntos/noticias/2026/defeso-eleitoral/setembro/acessibilidade-digital-o-que-e-e-por-que-importa


## Publicação com Netlify e Render

1. Publique este repositório no GitHub mantendo `server.js`, `package.json`, `backend/` e `site/` na raiz do projeto.
2. No Render, crie um Web Service conectado ao repositório. Use `npm install` como Build Command e `npm start` como Start Command.
3. Após o Render gerar a URL pública, configure a variável de ambiente `CORS_ORIGIN` com a URL do site Netlify (sem barra no final).
4. No arquivo `site/config.js`, preencha `window.CONEXAO_API_URL` com a URL pública do Render (por exemplo, `https://nome-do-servico.onrender.com`).
5. Faça commit e push dessa alteração no GitHub.
6. No Netlify, importe o mesmo repositório e configure `site` como Publish directory. Não é necessário Build Command.
7. Teste a URL `https://SUA-API.onrender.com/api/health` e envie o quiz pelo site publicado.

Durante o desenvolvimento local, deixe `window.CONEXAO_API_URL` vazio: o navegador utilizará a API na mesma origem (`/api/quiz`).
