const questions =[ 
    {
        questions:"Which is largest animal in the world?",
        answers:[
            {text:"shanck", correct:false},
            {text:"Blue-whale", correct:true},
            {text:"Elephent", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },

    {
        questions:"How many days are there in a week?",
        answers:[
            {text:"9days", correct: false},
            {text: "5days", correct: false},
            {text: "7days", correct: true},
            {text: "2days", correct: false},
        ]
    },

    {
        questions:"How many hours are there in a day",
        answers: [
            {text: "12hours", correct: false},
            {text: "24hours", correct: true},
            {text: "30hours", correct: false},
            {text: "15hours", correct: false},
        ]
    },
    {
        questions:"How many letters are there in the English alphabet?",
        answers: [
            {text: "26 letters", correct: true},
            {text: "52 letters", correct: false},
            {text: "20 letters", correct: false},
            {text: "34 letters", correct: false},
        ]
    },

    {
        questions:"Rainbow consist of how many colours?",
        answers: [
            {text: "8 colors", correct: false},
            {text: "5 colors", correct: false},
            {text: "9 colors", correct: false},
            {text: "7 colors", correct: true},
        ]
    },

    {
        questions:" How many days are there in a year?",
        answers: [
            {text: "465 days", correct: false},
            {text: "266 days", correct: false},
            {text: "365/366 days", correct: true},
            {text: "100 days", correct: false},
        ]
    },

    {
        questions:"Name the national flower of India?",
        answers: [
            {text: "Rose", correct: false},
            {text: "Lotus", correct: true},
            {text: "Jasminum", correct: false},
            {text: "Hibiscs", correct: false},
        ]
    },

    {
        questions:"What is the capital of India?",
        answers: [
            {text: "New Dehli", correct: true},
            {text: "Bhopal", correct: false},
            {text: "Indore", correct: false},
            {text: "Mumbhi", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-button");
const nextbtn = document.getElementById("next-btn");
const backbtn = document.getElementById("back-btn");

let correntQuestionIndex = 0;
let score = 0;

function startQuiz(){
    correntQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuetion = questions[correntQuestionIndex];
    let questionNo = correntQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuetion.questions;

    currentQuetion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextbtn.style.display = "none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild);
    }
}


function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct  === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score+=5;
    }else{
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerbtn.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextbtn.style.display = "block";
    backbtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${40}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
    backbtn.style.display = "none"
}

function handleNextButton(){
    correntQuestionIndex++;
    if(correntQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbtn.addEventListener("click", ()=>{
    if(correntQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

backbtn.addEventListener("click", () =>{
    if(correntQuestionIndex > 0){
        correntQuestionIndex--;
        showQuestion(); 
    }
    nextbtn.style.display = "block"
});
startQuiz();