const express = require("express");
const path = require("path");
const cors = require("cors");
const { gradeAnswers } = require("./backend/perguntas");

const app = express();
const PORT = process.env.PORT || 3000;
const siteDirectory = path.join(__dirname, "site");

// Configure CORS_ORIGIN in Render with the Netlify site URL.
// Multiple origins can be separated by commas.
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header (for example, local health checks) are allowed.
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origem não autorizada pelo CORS."));
  }
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.static(siteDirectory));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", projeto: "Conexão Segura 60+" });
});

app.post("/api/quiz", (req, res) => {
  const answers = req.body && req.body.answers;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return res.status(400).json({ error: "Envie as respostas do teste em um objeto chamado answers." });
  }

  const allowedQuestions = ["q1", "q2", "q3", "q4"];
  for (const key of Object.keys(answers)) {
    if (!allowedQuestions.includes(key) || !["a", "b"].includes(answers[key])) {
      return res.status(400).json({ error: "Uma das respostas não é válida. Revise o teste e tente novamente." });
    }
  }

  return res.json(gradeAnswers(answers));
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "A solicitação não está em um formato válido." });
  }
  if (err.message === "Origem não autorizada pelo CORS.") {
    return res.status(403).json({ error: "Origem não autorizada." });
  }
  console.error("Erro inesperado na aplicação:", err.message);
  return res.status(500).json({ error: "Ocorreu um erro interno. Tente novamente." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Conexão Segura 60+ disponível na porta ${PORT}`);
});
