// Gabarito e explicações mantidos no servidor, não enviados ao navegador.
// O quiz aborda exclusivamente situações de compras pela internet.
const questions = {
  q1: { correct: "b", explanation: "Compare os preços e verifique o endereço, a identificação e a reputação da loja antes de comprar. Preços muito abaixo do mercado merecem atenção." },
  q2: { correct: "b", explanation: "Mantenha a conversa e a compra dentro da plataforma oficial. Negociar por fora pode retirar recursos de segurança oferecidos pelo marketplace." },
  q3: { correct: "b", explanation: "Não confirme o Pix se o destinatário não corresponder à loja ou à instituição de pagamento informada. Confira os dados e procure o canal oficial." },
  q4: { correct: "b", explanation: "Não pague por um link recebido inesperadamente. Consulte o rastreamento e qualquer cobrança no site ou aplicativo oficial da loja ou transportadora." }
};

function gradeAnswers(answers) {
  const results = Object.entries(questions).map(([question, config]) => {
    const answer = answers[question];
    if (answer === undefined) {
      return { question, answered: false, correct: false, message: "Você precisa selecionar uma das opções." };
    }
    const correct = answer === config.correct;
    return { question, answered: true, correct, message: (correct ? "Correta! " : "Incorreta! ") + config.explanation };
  });
  return { score: results.filter((item) => item.correct).length, total: results.length, results };
}

module.exports = { gradeAnswers };
