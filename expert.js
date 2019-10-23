// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// EXPERT
let questions = [
    {
        question : "La phase d’avant projet est constituée de 3 grandes composantes (EXPRESSION DU BESOIN, ETUDE DE FAISABILITÉ, DÉFINITION DU PRODUIT)",
        imgSrc : "img/3.1.jpg",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "A",
        reponse : "En effet, pour passer à la phase de réalisation de projet il faut réaliser la phase d’expression du besoin, l’étude de faisabilité et définition du produit.",
    },{
        question : " Les futurs utilisateurs ont un rôle déterminant lors de la phase d’expressions du besoin.",
        imgSrc : "img/3.2.png",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "A",
        reponse : "Il est essentiel que les futurs utilisateurs expriment leurs besoins pour que le produit finale se rapproche le plus possible de leurs besoins. Eux seuls maîtrisent le terrain.",
    },{
        question : "Dans la démarche d’une étude préalable, dans la phase de recueil , nous avons 5 actions (DÉLIMITER l’étude, EXPLORER le champ, OBSERVER l’existant, RECUEILLIR les besoins et PROPOSER les orientations).",
        imgSrc : "img/3.3.jpg",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "B",
        reponse : "( DÉLIMITER l’étude, EXPLORER le champ, OBSERVER l’existant, RECUEILLIR les besoins, QUALIFIER la situation, PROPOSER les orientations)",
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















