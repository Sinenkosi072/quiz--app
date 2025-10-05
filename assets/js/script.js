$(document).ready(function(){
// quiz data
const quizData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
      explanation: "Paris is the capital and largest city of France.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation:
        "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correct: 1,
      explanation:
        "The Blue Whale is the largest animal ever known to have lived on Earth.",
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      explanation:
        "World War II ended in 1945 with the surrender of Japan in September.",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      explanation:
        "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
    },
  ];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
loadQuestion();

$('#nextBtn').click(function() {
  nextQuestion();
}); 

  function loadQuestion() {
    $('#nextBtn').prop("disabled" , true);
    $('#feedback').hide();

    let question = quizData[currentQuestion];


    //progress bar
    const progress = (currentQuestion/quizData.length) *100

    $('.progress-fill').css("width",""+progress+"%");


    $(".question-number").text(`Question ${currentQuestion + 1} of ${quizData.length}`);
    $(".question-text").text(question.question);
    $(".answers-container").empty();

    question.options.forEach((option, index) => {
      const answerElement = $(`<div class="answer-option">${String.fromCharCode(65 + index)}. ${option}</div>`);
      $(".answers-container").append(answerElement);

      answerElement.click(function () {
        selectAnswer(index);
      });
    });
  }

  function selectAnswer(index) {
if($('.answer-option').hasClass('disabled')){
  return;
}
    //disable the options
    $('.answer-option').addClass('disabled');
    $('#feedback').show();
  userAnswers[currentQuestion] = index;
    const question = quizData[currentQuestion];
    const isCorrect = index === question.correct;

//add correct or uncorrect class
$('.answer-option').each(function(option){
  if(option === question.correct ){
$(this).addClass("correct");
  }else if(option === index && !isCorrect){
$(this).addClass("incorrect");
  }
});

  

    if (isCorrect) {
      score++;
    }

    let feedbackText = '';
    let feedbackClass = "incorrect";
    if(isCorrect){
      feedbackText = '✅ Correct! ' + question.explanation;
      feedbackClass = "correct";
    }else{
      feedbackText = '❌ Incorrect! ' + question.explanation;
    }
     $(".feedback").addClass(feedbackClass).text(feedbackText);
       $('#nextBtn').prop("disabled" , false)

  }

  function nextQuestion(){
    currentQuestion++;
    if(currentQuestion < quizData.length){
      $('.feedback').text("");
  loadQuestion();
    }else{
   showResults();
    }
  
  }
  function showResults(){
    $('.progress-fill').css("width","100%");
    const percentage = (score/quizData.length )* 100;
    let message = "";
   if(percentage >= 80){
message = `You scored ${percentage}%! Excellent work!`;
   }else if(percentage >= 60){
message =`Yoy scored ${percentage}%! Good job!`;
   }else if(percentage >= 40){
    message = `You scored ${percentage}%! You Tried`;
   }else{
    message = `You scored ${percentage}%! Unfortunately you failed`;
   }

$('.score-display').text(`${score}/${quizData.length}`);

$('.score-message').text(message);

let breakdown = "<h3>Detailed Results:</h3>";

quizData.forEach((question,index) =>{
 const userAnswer = userAnswers[index];

 
// const isCorrect = userAnswer === question.correct
let isCorrect = false;
let eachResult = "incorrect";
if(userAnswer === question.correct){
  isCorrect = true;
  eachResult = "correct";
}

breakdown += `<div class ="result-item"><span>Question ${index +1}</span>
<span> ${eachResult}</span></div>`;

 
});

$('.results-breakdown').html(breakdown);
$('.quiz-content').hide();
$('.quiz-control').hide();
   
$('.results-container').addClass("show");
  }
});




