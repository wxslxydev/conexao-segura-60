// O navegador envia apenas as alternativas selecionadas para a API.
// A correção fica no servidor e as respostas não são armazenadas.
let programmaticScroll = false;
let programmaticScrollTimer;

document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const href = link.getAttribute("href");
    const target = href ? document.getElementById(href.slice(1)) : null;
    if (!target) return;
    event.preventDefault();
    const header = document.querySelector(".site-header");
    if (header) header.classList.remove("header-hidden");
    programmaticScroll = true;
    window.clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = window.setTimeout(function () { programmaticScroll = false; }, 1000);
    const heading = target.matches("h1, h2, h3") ? target : (target.querySelector("h1, h2") || target);
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = Math.max(0, heading.getBoundingClientRect().top + window.scrollY - headerHeight - 20);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.location.hash !== href) window.history.pushState(null, "", href);
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    window.scrollTo({ top: top, behavior: reducedMotion ? "auto" : "smooth" });
  });
});

(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let lastDirectionCheckY = Math.max(0, window.scrollY);
  let ticking = false;
  const threshold = 12;
  const topLimit = 24;
  function updateHeader() {
    const currentScrollY = Math.max(0, window.scrollY);
    const focusedInsideHeader = header.contains(document.activeElement);
    const delta = currentScrollY - lastDirectionCheckY;
    if (currentScrollY <= topLimit || focusedInsideHeader || programmaticScroll) {
      header.classList.remove("header-hidden"); lastDirectionCheckY = currentScrollY;
    } else if (delta >= threshold) {
      header.classList.add("header-hidden"); lastDirectionCheckY = currentScrollY;
    } else if (delta <= -threshold) {
      header.classList.remove("header-hidden"); lastDirectionCheckY = currentScrollY;
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(updateHeader); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", function () {
    if (window.scrollY <= topLimit) header.classList.remove("header-hidden");
  });
})();

const quizForm = document.getElementById("quiz-form");
const result = document.getElementById("quiz-result");
const submitButton = quizForm.querySelector('button[type="submit"]');
const questionIds = ["q1", "q2", "q3", "q4"];

quizForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  quizForm.querySelectorAll(".quiz-inline-feedback").forEach(function (message) { message.remove(); });
  result.replaceChildren();
  const answers = {};
  questionIds.forEach(function (question) {
    const selected = quizForm.querySelector('input[name="' + question + '"]:checked');
    if (selected) answers[question] = selected.value;
  });
  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Conferindo suas respostas...";
  try {
    const apiBaseUrl = (window.CONEXAO_API_URL || "").replace(/\/$/, "");
    const response = await fetch(`${apiBaseUrl}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: answers })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Não foi possível conferir o teste.");
    data.results.forEach(function (item) {
      const firstInput = quizForm.querySelector('input[name="' + item.question + '"]');
      if (!firstInput) return;
      const fieldset = firstInput.closest("fieldset");
      const selected = quizForm.querySelector('input[name="' + item.question + '"]:checked');
      const feedback = document.createElement("span");
      feedback.className = "quiz-inline-feedback " + (item.answered === false ? "unanswered" : (item.correct ? "correct" : "incorrect"));
      feedback.setAttribute("role", "status");
      feedback.textContent = item.message;
      if (selected) selected.closest("label").insertAdjacentElement("afterend", feedback);
      else fieldset.appendChild(feedback);
    });
    const summary = document.createElement("p");
    summary.className = "quiz-score";
    summary.textContent = "Você acertou " + data.score + " de " + data.total + ".";
    result.replaceChildren(summary);
    result.classList.add("has-results");
    result.focus();
  } catch (error) {
    const message = document.createElement("p");
    message.className = "quiz-error";
    message.textContent = "Não foi possível conferir agora. Verifique sua conexão e tente novamente. (" + error.message + ")";
    result.replaceChildren(message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});
