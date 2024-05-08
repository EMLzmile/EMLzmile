const questions = [
    {
        question: "Qui est plus beau que Gojo?",
        answers: [
            {text: "Kakashi", correct: false},
            {text: "Goku", correct: false},
            {text: "Senku", correct: false},
            {text: "John Wick", correct: true}
        ]
    },
    {
        question: "Quel est l'animal le plus rapide du monde ?",
        answers: [
            {text: "Aigle", correct: false},
            {text: "Faucon", correct: true},
            {text: "Narval", correct: false},
            {text: "Guépard", correct: false}
        ]
    },
    {
        question: "Quel est l'organe le plus polyvalent du corps humain ?",
        answers: [
            {text: "Langue", correct: true},
            {text: "Main", correct: false},
            {text: "Oeil", correct: false},
            {text: "Cerveau", correct: false}
        ]
    },
    {
        question: "Pourquoi Neji Hyuga est mort ?",
        answers: [
            {text: "Naruto est un con", correct: false},
            {text: "Prétexte scénaristique", correct: true},
            {text: "Il croyait être un gardien de but", correct: true},
            {text: "Il était sous l'emprise d'Itachi", correct: false}
        ]
    }
];

const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");

let currentQuestionIndex = 0;
let score = 0;
let questionNo = 1;
let T = [];


nextBtn.addEventListener('click', ()=> {
    if (questionNo < questions.length + 1) {
        handleNext();
    } else {
        startQuiz();
    }
});

resetBtn.addEventListener('click', startQuiz);

function showScore() {
    resetState();
    resetBtn.style.display = 'none';
    nextBtn.innerText = 'Rejouer'
    question.innerText = 'Tu as '+score+' bonnes reponses sur '+questions.length;
    nextBtn.style.display = 'block';
}

function handleNext() {
    questionNo++;
    if (questionNo < questions.length + 1) {
        showQuestion();
        resetBtn.style.display = 'block';
    } else {
        showScore();
    }
}

function startQuiz() {
    score = 0;
   // resetBtn.style.display = 'none';
    currentQuestionIndex = Math.floor(Math.random()*questions.length);
    T = [currentQuestionIndex];
    nextBtn.innerText = "Next";
    questionNo = 1;

    showQuestion();
}


function resetState() {
    nextBtn.style.display = 'none';
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    //questionNo++;
    let isExist = false;
    do {
        currentQuestionIndex = Math.floor(Math.random()*questions.length);
        for (let i = 0; i < T.length; i++) {
            isExist = T[i] === currentQuestionIndex;
            if (isExist)
                break;
        }
    }while ((isExist && T.length < questions.length)); // && j < 1000);
    console.log(T);
    T.push(currentQuestionIndex);

    question.innerText = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement('li');
        li.innerText = answer.text;
        li.classList.add('btn');

        answerBtn.appendChild(li);
        if (answer.correct) {
            li.dataset.correct = answer.correct;
        }

        li.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add('true');
        score++;
    } else {
        selectedBtn.classList.add('false');
    }

    Array.from(answerBtn.children).forEach(li => {
        if (li.dataset.correct === 'true') {
            li.classList.add('true');
        }
        li.classList.remove('btn');
        li.disabled = true;
        li.classList.add('cl');
        li.removeEventListener('click', selectAnswer);
    });

    nextBtn.style.display = 'block';
}


startQuiz();