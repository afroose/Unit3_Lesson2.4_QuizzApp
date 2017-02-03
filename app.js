// 1. object structure for quizz app = step 1 - Single state object - questionsArray

// I.   Question array
//      a. Question Text
//      b. Possible answers
//          1. Answer 1
//          ...
//          4. Answer 4
//      c. Valid answer: answer index from answer array
//      d. result: boolean - default = false
// II.  Current question = position in quizz
// III. Score

// Track game progress and score

var state = {
    questions: [
    {
        text: "Which one is green",
        answers: ["hulk", "Iron Man"],
        correct: 0, // 0 = hulk, 1 = iron man
        result: false
    },
    {
        text: "Which one is red",
        answers: ["hulk", "Iron Man"],
        correct: 1, // 0 = hulk, 1 = iron man
        result: false
    },
    {
        text: "Which one is blue",
        answers: ["hulk", "Iron Man", "captain America"],
        correct: 2, // 0 = hulk, 1 = iron man, 2 = captain America
        result: false
    }
    ],
    currentQuestion: 0,
    score: 0
}

// 2 - functions for updating state during game progress

var loadQuestion = function(state,element){
    renderQuiz(state, state.currentQuestion, element);
}

var checkQuestion = function(state,selectedAnswer){
    var currentIter = state.currentQuestion;
    if ( selectedAnswer === state.questions[currentIter].correct){
        state.questions[currentIter].result = true;
        state.score++;
    }
    state.currentQuestion++;
    //alert(state.score);
}

var showResults = function (state, targetElement) {
    var legendHTML = '<legend>End of Eroes Quiz</legend>';
    var questionHTML = '<div id="_Qend_text">So, how well did you do?</div>';
    var answersHTML = '<div id="_Qend_results">You got ' + state.score + ' correct out of ' + state.questions.length + ' questions.</div>';
    var submitHTML = 'Try again';
    // insert constructed items
    $(targetElement).find('.js-legend-text').html(legendHTML); // overwrite element existing html with legendHTML - legend - question counter
    $(targetElement).find('.js-question-text').html(questionHTML); // overwrite element existing html with questionHTML - question text
    $(targetElement).find('.js-answer-text').html(answersHTML); // overwrite element existing html with answersHTML - answers
    $(targetElement).parent().find('.js-submit').html(submitHTML); // overwrite element existing html with submitHTML - button text
    // reset state array to initial state to restart game    
    state.score = 0;
    state.currentQuestion = 0;
    for (var i = 0; i < state.questions.length; i++){
        state.questions[i].result = false;
    }
}

// 3 - add function to render the answers for each question = add element to DOM

var renderAnswers = function (question, questionIndex) { // element = DOM element that will store the new construct
    var itemsHTML = question.answers.map(function (newItem) {    // map() = new array
        var answerNumber = '_Q' + questionIndex + '_Answer' + $.inArray(newItem, question.answers)
        return '<input type="radio" name="_Q' + questionIndex + '" id="' + answerNumber + '" value="' + $.inArray(newItem, question.answers) + '" />' +
            '<label for="' + answerNumber + '">' + newItem + '</label><br/>'
    });
    // return constructed items to main loop
    return itemsHTML;
}

// 4 - add function to render the state = add element to DOM - based on index - retrieve values from the question array

var renderQuiz = function (state, currentQuestion, targetElement) {
    var questionNumber = currentQuestion + 1;
    var legendHTML = '<legend>Question Number: ' + questionNumber + ' of ' + state.questions.length + '</legend>';
    var questionHTML = '<div id="_Q' + currentQuestion + '_text">' + state.questions[currentQuestion].text + '</div>';
    var answersHTML = renderAnswers(state.questions[currentQuestion], currentQuestion);
    var submitHTML = 'Next Question';
    // insert constructed items
    $(targetElement).find('.js-legend-text').html(legendHTML); // overwrite element existing html with legendHTML - legend - question counter
    $(targetElement).find('.js-question-text').html(questionHTML); // overwrite element existing html with questionHTML - question text
    $(targetElement).find('.js-answer-text').html(answersHTML); // overwrite element existing html with answersHTML - answers
    $(targetElement).parent().find('.js-submit').html(submitHTML); // overwrite element existing html with submitHTML - button text
}

// Loop through question array
// for (var i = 0; i < questionsArray.length; i++) {
//    console.log("array: ", questionsArray[i]); // loop through object
//    renderQuizz(questionsArray[i],$('.js-question-fieldset'));
//}

// Steps for the quizz application:
// 1. Render the initial state = item 0 of the question array
// 2. write function - on submit move to next question

$(function () { // callback function
    $('.nojs-warning').remove();

    // load first question - from state array state/html element to update
    loadQuestion(state, $('.js-question-fieldset'));    

//  Event Listener(s) to capture the added element, then create element (call addItem and renderList)
//  Use jQuery - check form class for submit

    $('#hero-quizz-form').submit(function (event) {
        event.preventDefault(); // do not submit yet
        // add triggered functions
        // check function - the answer selected has to match the "correct answer" from the question array
        var selectedAnswer = parseInt($('input[type=radio]:checked', '#hero-quizz-form').val()); // use parseInt else value returned is string
        if(!isNaN(selectedAnswer)){ checkQuestion(state, selectedAnswer);}; 
        // Check question number vs length of array question - load new questions or show reults
        var questionNumber = state.currentQuestion + 1; 
        if(questionNumber <= state.questions.length){
            // load function - render next question
            loadQuestion(state, $('.js-question-fieldset'));  
        } else {
            showResults(state, $('.js-question-fieldset'));  
        }
    });
})
