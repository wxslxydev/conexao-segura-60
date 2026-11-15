# Conexão Segura 60+ | Guia técnico

**Tema:** Segurança em compras online para pessoas idosas: identificação de lojas falsas, anúncios fraudulentos e golpes em marketplaces.

## Acesso público
- **Módulo educativo e quiz:** https://conexao-segura-60.netlify.app
- **API (Render):** https://conexao-segura-60-api.onrender.com
- **Verificação de saúde:** https://conexao-segura-60-api.onrender.com/api/health
- **Repositório:** https://github.com/wxslxydev/conexao-segura-60

O frontend está publicado no Netlify e a API Express está publicada no Render. O quiz envia as alternativas selecionadas à API para correção. As respostas não são armazenadas em banco de dados.

## Escopo
O módulo aborda a jornada de compra pela internet: loja e anúncio, vendedor/marketplace, pagamento e entrega. Não tem como foco golpes genéricos por WhatsApp, falsas centrais bancárias ou phishing fora do contexto de uma compra online.

> Observação: o plano docente permite propor novos temas, desde que não haja duplicidade. A confirmação de que este recorte não conflita com outra squad deve ser feita com o professor.

## Estrutura do módulo
- `site/index.html`: estrutura e conteúdo educativo.
- `site/style.css`: identidade visual, contraste e regras responsivas.
- `site/script.js`: navegação, envio do quiz e exibição do feedback.
- `site/config.js`: endereço público da API utilizado pelo frontend.
- `server.js`: servidor Express, middleware CORS e rotas HTTP.
- `backend/perguntas.js`: gabarito e explicações do quiz, mantidos no servidor.
- `package.json`: dependências e comandos de execução.

## Executar localmente
Pré-requisito: Node.js 18 ou superior.

1. Abra o terminal nesta pasta (`01_Modulo_Educativo_e_Quiz`).
2. Para executar frontend e API na mesma origem, altere temporariamente `site/config.js` para:

   ```js
   window.CONEXAO_API_URL = "";
   ```

3. Execute `npm install`.
4. Execute `npm start`.
5. Acesse `http://localhost:3000`.
6. Verifique a API em `http://localhost:3000/api/health`.
7. Faça o envio do quiz e confira a pontuação e o feedback.

**Importante:** antes de fazer commit ou publicar novamente, restaure em `site/config.js` a URL pública da API:

```js
window.CONEXAO_API_URL = "https://conexao-segura-60-api.onrender.com";
```

## Publicação configurada

### Render (backend)
- Repositório: `wxslxydev/conexao-segura-60`.
- Root Directory: `01_Modulo_Educativo_e_Quiz`.
- Build Command: `npm install`.
- Start Command: `npm start`.
- Variável de ambiente `CORS_ORIGIN`: `https://conexao-segura-60.netlify.app` (sem barra no final).

### Netlify (frontend)
- Repositório: `wxslxydev/conexao-segura-60`.
- Base directory: `01_Modulo_Educativo_e_Quiz`.
- Build command: vazio.
- Publish directory: `site`.

A configuração atual do frontend já contém a URL pública do Render em `site/config.js`. O CORS do backend permite a origem pública do Netlify configurada em `CORS_ORIGIN`.

## Validação técnica registrada
- A rota local `POST /api/quiz` foi testada e retornou HTTP 200 OK com pontuação e feedback.
- A rota pública `GET /api/health` foi acessada e teve o retorno esperado confirmado pelo responsável.
- Em 15/11/2026, o site público foi aberto em janela anônima e o quiz retornou pontuação e feedback pela API hospedada no Render.
- A lógica do quiz foi conferida com cenários de todas corretas, todas incorretas, duas corretas e nenhuma resposta.

Essas evidências demonstram funcionamento técnico dos fluxos verificados. Não representam teste de usabilidade com participantes idosos. Permanecem como verificações complementares: testar por HTTP entradas inválidas, conferir a experiência em dispositivo físico e, caso autorizado, avaliar com pessoas idosas reais.

## Aderência ao plano docente e pendências
- Módulo educativo estático: implementado.
- Produto interativo: quiz incorporado ao módulo.
- Artigo científico: incluído em DOCX editável e PDF.
- Registro da Sprint 5: incluído em DOCX e PDF, com avaliação simulada orientada por tarefas; não houve participantes reais.
- O plano também prevê apresentação pública e retrospectiva no encerramento. A apresentação deve ser mantida como material separado e incluída na entrega se o professor solicitar o arquivo.
- A seção 4 do plano aceita vídeo, jogo/interativo leve ou imagens como formato do produto final. A Sprint 3 menciona um “rascunho de vídeo”; confirmar com o professor se esse item permanece aplicável quando o quiz é o produto escolhido.
- A confirmação de que o tema não conflita com outra squad continua dependendo do professor.

## Fontes principais
- CERT.br/NIC.br/CGI.br: https://cartilha.cert.br/fasciculos/comercio-via-internet/fasciculo-comercio-via-internet-alta.pdf
- Receita Federal: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/e-golpe/compras-em-redes-sociais/compras-em-redes-sociais
- Senacon: https://www.gov.br/mj/pt-br/assuntos/noticias/senacon-explica-como-evitar-fraudes-em-compras-on-line
- Procon-SP (alerta Pix): https://www.procon.sp.gov.br/procon-sp-orienta-consumidores-sobre-novo-golpe-que-altera-qr-code-do-pix-em-compras-online/
- Procon-SP (pessoa idosa): https://www.procon.sp.gov.br/pessoa-idosa-x-mercado-de-consumo-consulta-do-procon-sp-indica-que-mais-da-metade-da-populacao-60-tem-alguma-dificuldade-em-compras-on-line/
- Ministério dos Direitos Humanos e da Cidadania (acessibilidade digital): https://www.gov.br/mdh/pt-br/assuntos/noticias/2026/defeso-eleitoral/setembro/acessibilidade-digital-o-que-e-e-por-que-importa
