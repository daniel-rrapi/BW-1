const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const questionIndexElement = document.getElementById("question-index");
let startTime;
let duration;

function updateCircleTimer() {
  let elapsed = performance.now() - startTime;
  let timeLeft = duration - elapsed;
  if (timeLeft <= 0) {
    timeLeft = 0;
    nextQuestion();
    return;
  }
  const circle = document.querySelector(".circle");
  const timeLeftLabel = document.querySelector(".time-left");
  let percentage = (timeLeft / duration) * 100;
  circle.setAttribute("stroke-dasharray", ` ${percentage}, 100`);
  timeLeftLabel.textContent = Math.ceil(timeLeft / 1000);
  if (timeLeft > 0) {
    requestAnimationFrame(updateCircleTimer);
  }
}

function resetTimer() {
  const questionType = questions[currentQuestionIndex].type;
  duration = questionType === "boolean" ? 30 * 1000 : 60 * 1000;
  startTime = performance.now();
  updateCircleTimer();
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) {
    questionContainer.innerHTML = "";
    questionIndexElement.style.display = "none";
    hideTimer();
    calculateAndDisplayResults();
    return;
  }

  questionIndexElement.textContent = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;
  questionContainer.innerHTML = `<p>${question.question}</p>`;
  question.incorrect_answers.concat(question.correct_answer).forEach((answer) => {
    questionContainer.innerHTML += `
      <input type="radio" name="answer" value="${answer}" id="${answer}">
      <label for="${answer}">${answer}</label>`;
  });

  questionContainer.innerHTML += `
    <button id="next-button" onclick="nextQuestion()" style="visibility: hidden;">Domanda successiva</button>`;

  const answerOptions = document.querySelectorAll('input[name="answer"]');
  answerOptions.forEach((option) => {
    option.addEventListener("change", handleAnswerSelection);
  });
  checkSelectedAnswer();
  resetTimer();
}

function nextQuestion() {
  resetTimer();
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    questionContainer.innerHTML = "";
    questionIndexElement.style.display = "none";
    hideTimer();
    calculateAndDisplayResults();
  } else {
    displayQuestion();
  }
}

function hideTimer() {
  const timerElement = document.querySelector(".circle-timer");
  timerElement.style.display = "none";
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

function handleAnswerSelection(event) {
  const allAnswerLabels = document.querySelectorAll('input[name="answer"] + label');
  allAnswerLabels.forEach((label) => {
    label.classList.remove("selected");
  });

  const selectedLabel = event.target.nextElementSibling;
  if (selectedLabel) {
    selectedLabel.classList.add("selected");
  }

  checkSelectedAnswer();
}

function calculateAndDisplayResults() {
  const totalQuestions = questions.length;
  const correctPercentage = ((score / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (((totalQuestions - score) / totalQuestions) * 100).toFixed(1);
  resultContainer.innerHTML += `<p>Risposte corrette: ${correctPercentage}%</p>`;
  resultContainer.innerHTML += `<p>Risposte errate: ${incorrectPercentage}%</p>`;
  if (score >= totalQuestions / 2) {
    // Se il punteggio è almeno la metà del totale delle domande, l'esame è superato.
    resultContainer.innerHTML = `
      Congratulazioni!<br>
      Hai superato l'esame.<br>
      Ti invieremo il certificato in pochi minuti.<br>
      Controlla la tua email (incluse promozioni/cartella spam).
    `;
  } else {
    // Se il punteggio è inferiore alla metà del totale delle domande, l'esame non è superato.
    resultContainer.innerHTML = `
      Ci dispiace molto, non hai superato l'esame.<br>
      Ti invitiamo a riprovare.<br>
      Controlla la tua email (incluse promozioni/cartella spam).
    `;
  }
  resultContainer.innerHTML += `<p>Risposte corrette: ${correctPercentage}%</p>`;
  resultContainer.innerHTML += `<p>Risposte errate: ${incorrectPercentage}%</p>`;
}

displayQuestion();
