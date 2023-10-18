const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    timelimit: 30,
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    timelimit: 30,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
    timelimit: 60,
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    timelimit: 30,
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
    timelimit: 60,
  },
];

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: { color: "green" },
  warning: { color: "orange", threshold: WARNING_THRESHOLD },
  alert: { color: "red", threshold: ALERT_THRESHOLD },
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const timerElement = document.getElementById("timer");
const questionIndexElement = document.getElementById("question-index");

let currentQuestionIndex = 0;
let score = 0;

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  remainingPathColor = COLOR_CODES.info.color;

  updateTimerDisplay(timeLeft);
  setCircleDasharray();
  setRemainingPathColor(timeLeft);

  startTimer();
}
function updateTimerDisplay(timeRemaining) {
  const timerElement = document.getElementById("timer");

  if (timerElement) {
    timerElement.textContent = `Tempo rimanente: ${formatTime(timeRemaining)} secondi`;
  } else {
    console.warn(
      "Elemento con id 'timer' non trovato. Il timer potrebbe essere nascosto o non presente nel documento."
    );
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    updateTimerDisplay(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

function onTimesUp() {
  clearInterval(timerInterval);
  resetTimer();
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  return timeLeft / TIME_LIMIT;
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) {
    timerElement.style.display = "none";
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = `Punteggio finale: ${score} su ${questions.length}`;
    questionIndexElement.style.display = "none";
    return;
  }

  questionIndexElement.textContent = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;

  questionContainer.innerHTML = `<p>${question.question}</p>`;

  question.incorrect_answers.forEach((answer) => {
    questionContainer.innerHTML += `
      <input type="radio" name="answer" value="${answer}" id="${answer}">
      <label for="${answer}">${answer}</label>
    `;
  });

  questionContainer.innerHTML += `
    <input type="radio" name="answer" value="${question.correct_answer}" id="${question.correct_answer}">
    <label for="${question.correct_answer}">${question.correct_answer}</label>
  `;

  questionContainer.innerHTML += `
    <button id="next-button" onclick="nextQuestion()" style="visibility: hidden;">Domanda successiva</button>
  `;

  startTimer();

  const answerOptions = document.querySelectorAll('input[name="answer"]');
  answerOptions.forEach((option) => {
    option.addEventListener("change", handleAnswerSelection);
  });

  checkSelectedAnswer();
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
    score++;
  }

  currentQuestionIndex++;
  clearInterval(timerInterval);
  if (currentQuestionIndex >= questions.length) {
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = `Punteggio finale: ${score} su ${questions.length}`;
    timerElement.style.display = "none";
    questionIndexElement.style.display = "none";
  } else {
    displayQuestion();
  }
}

function checkAnswerAutomatically() {
  nextQuestion();
}

function checkSelectedAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  const nextButton = document.getElementById("next-button");

  if (selectedAnswer) {
    nextButton.style.visibility = "visible";
  } else {
    nextButton.style.visibility = "hidden";
  }
}

function handleAnswerSelection() {
  const answerLabels = document.querySelectorAll("label");
  answerLabels.forEach((label) => {
    label.classList.remove("selected");
  });

  const selectedLabel = document.querySelector('input[name="answer"]:checked + label');
  if (selectedLabel) {
    selectedLabel.classList.add("selected");
  }

  checkSelectedAnswer();
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
}

displayQuestion();
