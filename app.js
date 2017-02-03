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
// old quizz function

/*var renderQuizz = function (currentQuestion, index, element) { // element = DOM element that will store the new construct -fieldset - .js-question-fieldset
    console.log(element);
    //var questionHTML = 
    //console.log(index);
    var answersHTML = renderAnswers(currentQuestion, index);
    //console.log("question Text: ",questionHTML);
    console.log("Answers: ", answersHTML);
    // insert constructed items
    var itemsHTML = answersHTML
    element.html(itemsHTML); // overwrite element existing html with itemsHTML

    // use join and replace ',' to build answer list
}*/

var renderQuiz = function (state, currentQuestion, targetElement) {
    var questionHTML = '<div id="_Q' + currentQuestion + '_text">' + state.questions[currentQuestion].text + '</div><legend>Question Number: ' + currentQuestion + ' of' + state.questions.length + '</legend>';
    var answersHTML = renderAnswers(state.questions[currentQuestion], currentQuestion);
    // insert constructed items
    var itemsHTML = questionHTML + answersHTML;
    targetElement.html(itemsHTML); // overwrite element existing html with itemsHTML
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
        // score function
        // load function - render next question
        //addItem(state, $('#shopping-list-entry').val());
        //renderList(state,$('.shopping-list'));
        alert($('input[type=radio]:checked', '#hero-quizz-form').val());
        alert("test");
    });
})
