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

//  CONFIRMER
let questions = [
    {
        question : "Dans la démarche d’une étude préalable il y a 4 grandes phases (RECUEIL, CONCEPTION, ORGANISATION et APPRÉCIATION)",
        imgSrc : "img/2.1.jpg",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "A",
        reponse : "RECUEIL,CONCEPTION,ORGANISATION,APPRÉCIATION",

    },{
        question : "Un cahier des charges est un document qui permet de définir et d’analyser les différents besoins pour le projet",
        imgSrc : "img/2.2.jpg",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "B",
        reponse : " Un cahier des charges est un document qui permet de comprendre et d’expliquer un projet dans son ensemble, avec toutes les contraintes, les besoins, les objectifs ou encore les intervenants qui y sont liés. En d’autres termes, un cahier des charges est la base pour pouvoir concevoir de A à Z votre projet technique, sans rien oublier et en indiquant tous les éléments qui devront être pris en compte. Sans ce document, toute conception de site Internet risque d’aboutir à un échec total.",
    },{
        question : "Dans la démarche d’une étude préalable, dans la phase d’organisation, nous avons 3 actions (MATÉRIALISER la solution, QUANTIFIER, ORGANISER)",
        imgSrc : "img/2.3.jpg",
        choiceA : "Vrai",
        choiceB : "Faux",
        correct : "A",
        reponse : "MATÉRIALISER la solution, QUANTIFIER, ORGANISER",
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





















