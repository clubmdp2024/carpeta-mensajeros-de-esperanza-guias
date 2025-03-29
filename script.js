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
      q: "¿Cuál es la capital de Colombia?",
      options: ["Cali", "Medellín", "Bogotá", "Cartagena"],
      answer: "Bogotá",
    },
    {
      q: "¿Cuánto es 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      q: "¿Qué color resulta de mezclar azul y amarillo?",
      options: ["Verde", "Rojo", "Naranja", "Morado"],
      answer: "Verde",
    },
  ]),
  EN: shuffleArray([
    {
      q: "¿Cuántos días tiene una semana?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      q: "¿Cuál es el océano más grande del mundo?",
      options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
      answer: "Pacífico",
    },
    {
      q: "¿Cuál es el planeta más cercano al sol?",
      options: ["Marte", "Venus", "Mercurio", "Tierra"],
      answer: "Mercurio",
    },
  ]),
  TRE: shuffleArray([
    {
      q: "¿Cuántos continentes hay en el mundo?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      q: "¿Cuál es el metal principal en el acero?",
      options: ["Aluminio", "Hierro", "Cobre", "Oro"],
      answer: "Hierro",
    },
    {
      q: "¿Cuántos huesos tiene el cuerpo humano?",
      options: ["196", "206", "216", "226"],
      answer: "206",
    },
  ]),
  GA: shuffleArray([
    {
      q: "¿Qué gas respiramos para sobrevivir?",
      options: ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Helio"],
      answer: "Oxígeno",
    },
    {
      q: "¿Qué animal es conocido como el rey de la selva?",
      options: ["Elefante", "León", "Tigre", "Oso"],
      answer: "León",
    },
    {
      q: "¿Cuántos lados tiene un triángulo?",
      options: ["2", "3", "4", "5"],
      answer: "3",
    },
  ]),
};

// Función para verificar respuesta
function checkAnswer(selected, group, questionIndex) {
  if (selected === questions[group][questionIndex].answer) {
    questionIndex++;
    if (questionIndex >= questions[group].length) {
      // Se desbloquea el botón y avanza al siguiente grupo
      unlockButton(group);
      updatePhrase(group);
      currentGroupIndex++;
      saveProgress();
      if (currentGroupIndex < groups.length) {
        setTimeout(startQuiz, 500);
      } else {
        document.getElementById("restart-btn").style.display = "block"; // Muestra botón de reinicio
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
    });
  }
}

// Carga una pregunta
function loadQuestion(group, questionIndex) {
  const { q, options } = questions[group][questionIndex];
  let html = `<p>${q}</p>`;
  options.forEach((option) => {
    html += `<button onclick="checkAnswer('${option}', '${group}', ${questionIndex})">${option}</button>`;
  });
  document.getElementById("quiz-container").innerHTML = html;
}

// Inicia el cuestionario con el grupo actual
function startQuiz() {
  if (currentGroupIndex < groups.length) {
    document.getElementById("quiz-container").innerHTML = "";
    loadQuestion(groups[currentGroupIndex], 0);
  }
}

// Actualiza la frase en la pantalla con los grupos desbloqueados
function updatePhrase(group) {
  let phrase = "";
  groups.forEach((g, i) => {
    if (i <= currentGroupIndex) {
      phrase += g + " ";
    }
  });
  document.getElementById("phrase").textContent = phrase.trim();
}

// Función para cambiar de página cuando se hace clic en un botón desbloqueado
function openPage(url) {
  window.location.href = url;
}

// Desbloquea el botón de un grupo completado
function unlockButton(group) {
  const btn = document.getElementById(`${group.toLowerCase()}-btn`);
  if (btn) {
    btn.style.display = "block";
  }
}

// Guarda el progreso del usuario en sessionStorage
function saveProgress() {
  const progress = {
    currentGroupIndex: currentGroupIndex,
    phrase: document.getElementById("phrase").textContent,
    unlockedButtons: groups.slice(0, currentGroupIndex + 1),
  };
  sessionStorage.setItem("quizProgress", JSON.stringify(progress));
}

// Carga el progreso del usuario al volver a la página
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

// Reinicia el juego borrando el progreso
function restartGame() {
  sessionStorage.clear();
  location.reload();
}

// Cargar progreso si existe al abrir la página
loadProgress();
function openPage(url) {
  window.open(url, "_blank");
}
document.addEventListener("contextmenu", function (event) {
  event.preventDefault(); // Bloquea clic derecho
});

document.addEventListener("copy", function (event) {
  event.preventDefault(); // Bloquea copiar
});

document.addEventListener("cut", function (event) {
  event.preventDefault(); // Bloquea cortar
});

document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    (event.key === "c" || event.key === "x" || event.key === "u")
  ) {
    event.preventDefault(); // Bloquea Ctrl + C, Ctrl + X y Ctrl + U (ver código fuente)
  }
});
