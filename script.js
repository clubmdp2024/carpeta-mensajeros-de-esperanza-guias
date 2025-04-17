// Lista de grupos
const groups = ["WE", "EN", "TRE", "GA"];
let currentGroupIndex = 0; // Índice del grupo actual

// Función para mezclar aleatoriamente un array (usada en las preguntas)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Preguntas organizadas por grupo
const questions = {
  WE: shuffleArray([
    {
      q: "Conforme al escrito esta de 1 Pedro 2:9 (Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable), se puede inferir que este hace referentica a:?",
      options: [
        "Nuestra Historia",
        "Todas Las Anteriores",
        "Nuestro Proposito, Mision y Vision en esta tierra",
      ],
      answer: "Todas Las Anteriores",
    },
  ]),
  EN: shuffleArray([
    {
      q: "Conforme al escrito esta de 1 de Juan 3:1(Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios; por esto el mundo no nos conoce, porque no le conoció a él), se puede  afirmar que este hace alusión a:",
      options: [
        "Nuestra verdadera identidad",
        "Nuestra verdadera familia",
        "Nuestro Proposito, Mision y Vision en esta tierra",
      ],
      answer: [
        "Nuestra identidad",
        "Nuestro Proposito, Mision y Vision en esta tierra",
      ],
    },
  ]),
  TRE: shuffleArray([
    {
      q: "De acuerdo al escrito esta de 1 corintios 14:40 (Hágase todo decentemente y con orden), Tanto en nuestra vida cotidiana como en el servicio en la obra del señor debemos procurar:",
      options: [
        "La Planificación y coordinacion",
        "La perfección y puntualidad",
        "La limpieza y pulcritud",
      ],
      answer: "La Planificación y coordinacion",
    },
  ]),
  GA: shuffleArray([
    {
      q: "Aptitud y actitud son dos palabras que guardan una relación intrínseca; la primera nos habla de los dones y talentos (capacidades) con las que nuestro Padre nos dotó, la otra nos habla de la disposición con la que ejercemos dichas capacidades. Es por eso que tu entrega, mi entrega, nuestra entrega dependen de poner al servicio de Dios tantos dones y talentos con la mejor disposición para que la obra del Señor sea llevada a cabo en el mundo entero. Con esta reseña en mente, elige el escrito esta que mejor describe el pensamiento anterior:",
      options: ["2 Corintios 12:15", "Lucas 10:20", "Colosenses 3:23-24", ],
      answer: [
        "2 Corintios 12:15",
        "Colosenses 3:23-24",
      ],
    },
  ]),
};

// Función para verificar respuesta (ahora acepta múltiples respuestas correctas)
function checkAnswer(selected, group, questionIndex) {
  const correctAnswer = questions[group][questionIndex].answer;
  const isCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.includes(selected)
    : selected === correctAnswer;

  if (isCorrect) {
    questionIndex++;
    if (questionIndex >= questions[group].length) {
      unlockButton(group);
      updatePhrase(group);
      currentGroupIndex++;
      saveProgress();
      if (currentGroupIndex < groups.length) {
        setTimeout(startQuiz, 500);
      } else {
        document.getElementById("restart-btn").style.display = "block";
      }
    } else {
      loadQuestion(group, questionIndex);
    }
  } else {
    Swal.fire({
      title: "❌ Respuesta incorrecta",
      text: "Inténtalo de nuevo.",
      icon: "error",
      confirmButtonText: "Reintentar",
      backdrop: false,
    });
  }
}

function loadQuestion(group, questionIndex) {
  const { q, options } = questions[group][questionIndex];
  let html = `<p>${q}</p>`;
  options.forEach((option) => {
    html += `<button onclick="checkAnswer('${option}', '${group}', ${questionIndex})">${option}</button>`;
  });
  document.getElementById("quiz-container").innerHTML = html;
}

function startQuiz() {
  if (currentGroupIndex < groups.length) {
    document.getElementById("quiz-container").innerHTML = "";
    loadQuestion(groups[currentGroupIndex], 0);
  }
}

function updatePhrase(group) {
  let phrase = "";
  groups.forEach((g, i) => {
    if (i <= currentGroupIndex) {
      phrase += g + " ";
    }
  });
  document.getElementById("phrase").textContent = phrase.trim();
}

function openPage(url) {
  window.location.href = url;
}

function unlockButton(group) {
  const btn = document.getElementById(`${group.toLowerCase()}-btn`);
  if (btn) {
    btn.style.display = "block";
  }
}

function saveProgress() {
  const progress = {
    currentGroupIndex: currentGroupIndex,
    phrase: document.getElementById("phrase").textContent,
    unlockedButtons: groups.slice(0, currentGroupIndex + 1),
  };
  sessionStorage.setItem("quizProgress", JSON.stringify(progress));
}

function loadProgress() {
  const progress = JSON.parse(sessionStorage.getItem("quizProgress"));
  if (progress) {
    currentGroupIndex = progress.currentGroupIndex;
    document.getElementById("phrase").textContent = progress.phrase;
    progress.unlockedButtons.forEach((group) => unlockButton(group));
    if (currentGroupIndex >= groups.length) {
      document.getElementById("restart-btn").style.display = "block";
    }
  }
  startQuiz();
}

function restartGame() {
  sessionStorage.clear();
  location.reload();
}

loadProgress();
window.onload = function () {
  loadProgress();
  setTimeout(() => {
    Swal.fire({
      title: `<span style="font-size: 1.3em; font-weight: bold; color: #007BFF;">
        Te invitamos a conocer el <span style="color: #FF7F00;">ADN</span> de un <span style="color: #28a745;">Mensajero</span>
      </span>`,
      html: `
        <p style="font-size: 1em;">
          A través de cada acertijo descubrirás el trasegar por la ruta de nuestra entrega a la misión como jóvenes en acción.<br><br>
          Cada pregunta será una llave que desbloquea una parte de la palabra 
          <strong style="color:#007BFF;">MI</strong> - 
          <strong style="color:#FF7F00;">EN</strong> - 
          <strong style="color:#28a745;">TRE</strong> - 
          <strong style="color:#e83e8c;">GA</strong>, que representa los pilares de nuestro Club:
        </p>
        <ul style="text-align: left; line-height: 1.5em; font-size: 0.95em; padding-left: 20px;">
          <li><strong style="color:#007BFF;">MI</strong>: Mi compromiso personal con Dios.</li>
          <li><strong style="color:#FF7F00;">EN</strong>: Entendimiento de mi propósito en la misión.</li>
          <li><strong style="color:#28a745;">TRE</strong>: Trabajo en equipo con otros jóvenes.</li>
          <li><strong style="color:#e83e8c;">GA</strong>: Ganas de servir con pasión y entrega total.</li>
        </ul>
        <p style="margin-top: 10px; font-size: 0.95em;">
          ¡Prepárate para <strong>aprender, reflexionar</strong> y <strong>dar lo mejor de ti</strong>!
        </p>
      `,
      icon: "info",
      confirmButtonText: "Entendido",
      backdrop: false,
      customClass: {
        popup: "swal-wide",
      },
    });
  }, 500);
};

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("copy", function (event) {
  event.preventDefault();
});

document.addEventListener("cut", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    (event.key === "c" || event.key === "x" || event.key === "u")
  ) {
    event.preventDefault();
  }
});
