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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const timerElement = document.getElementById("timer");
const questionIndexElement = document.getElementById("question-index");

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) {
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = `Punteggio finale: ${score} su ${questions.length}`;
    timerElement.style.display = "none";
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

  startTimer(question.timelimit);

  const answerOptions = document.querySelectorAll('input[name="answer"]');
  answerOptions.forEach((option) => {
    option.addEventListener("change", handleAnswerSelection);
  });

  checkSelectedAnswer();
}

function startTimer(timeLimit) {
  let timeRemaining = timeLimit;

  timerElement.style.display = "inline";
  updateTimerDisplay(timeRemaining);

  const animationDuration = timeLimit * 1000;

  timer = setInterval(function () {
    timeRemaining--;
    if (timeRemaining < 0) {
      clearInterval(timer);
      checkAnswerAutomatically();
    } else {
      updateTimerDisplay(timeRemaining);
    }
  }, 1000);

  const existingAnimation = document.getElementById("progressAnimation");
  if (existingAnimation) {
    existingAnimation.parentNode.removeChild(existingAnimation);
  }

  const style = document.createElement("style");
  style.id = "progressAnimation";
  style.innerHTML = `@keyframes progressAnimation { to { stroke-dashoffset: 0; } }`;
  document.head.appendChild(style);

  const circle = document.querySelector(".overlay circle");
  circle.style.animation = `progressAnimation ${animationDuration}ms linear forwards`;
}
function updateTimerDisplay(timeRemaining) {
  timerElement.textContent = ` ${timeRemaining} secondi`;
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
    score++;
  }

  currentQuestionIndex++;
  clearInterval(timer);
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

displayQuestion();
