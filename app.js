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
    {   // 0
        text: "Who was a founder or Marvel Comics?",
        answers: ["Jack Kirby", "Steve Lee", "Stan Ditko", "Daniel Roose"],
        correct: 0, // 0 = Jack Kirby
        result: false
    },
    {   // 1
        text: "Which of the following is a quote attributed to Uncle Ben?",
        answers: ["With awesome power comes some responsibility",
        "What power? I don't want no responsibility!",
        "With great power come great responsibilities.",
        "With no power, there are no responsibilities."],
        correct: 2, // 2 = With great power come great responsibilities.
        result: false
    }
    //,
    // {   // 2
    //     text: "Who is Peter Parker's first love?",
    //     answers: ["Kitty Pryde", "Betty Brant", "Mary Jane", "Gwen Stacy"],
    //     correct: 3, // 3 = Gwen Stacy
    //     result: false
    // },
    // {   // 4
    //     text: "Who is part of the Marvel Illuminati?",
    //     answers: ["Doctor Strange", "Mr. Fantastic", "Dr. Bruce Banner", "Magneto"],
    //     correct: 0, // 0 = Doctor Strange
    //     result: false
    // },
    // {   // 5
    //     text: "Who wears the Eye of Agamoto?",
    //     answers: ["Iron Man", "The Ancient One", "Baron Mordo", "Dr. Strange"],
    //     correct: 3, // 3 = Doctor Strange
    //     result: false
    // },
    // {   // 6
    //     text: "Who is the son of Odin?",
    //     answers: ["Thor", "Hulk", "Loki", "Heimdall"],
    //     correct: 0, // 0 = Thor
    //     result: false
    // },
    // {   // 7
    //     text: "Who is a member of the Fantastic Four?",
    //     answers: ["Tony Stark", "Johnny Storm", "Bruce Banner", "Steven Strange"],
    //     correct: 1, // 1 = Johnny Storm
    //     result: false
    // },
    // {   // 8
    //     text: "What were Wolverine's claws made of originally?",
    //     answers: ["Iron", "Bone", "Adamantium", "He did not have claws when he was born!"],
    //     correct: 1, // 1 = bone
    //     result: false
    // },
    // {   // 9
    //     text: "What makes Red Hulk stronger?",
    //     answers: ["Anger", "Cold", "Electicity", "Heat"],
    //     correct: 3, // 3 = heat
    //     result: false
    // },
    // {   // 10
    //     text: "What is Hulk's real name?",
    //     answers: ["Peter Parker", "Tony Stark", "Bruce Banner", "Viktor Von Doom"],
    //     correct: 2, // 2 = Bruce Banner
    //     result: false
    // }
    ],
    currentQuestion: 0,
    currentQuizState: "startQuiz", // values: startQuiz = start quiz / showQuiz/ IncorrectAnswer / endQuiz
    score: 0
}

// Quiz functions


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

// 3 - add function to render the answers for each question = add element to DOM

var renderAnswers = function (question, questionIndex) { // element = DOM element that will store the new construct
    var itemsHTML = question.answers.map(function (newItem) {    // map() = new array
        var answerNumber = '_Q' + questionIndex + '_Answer' + $.inArray(newItem, question.answers)
        return '<input type="radio" name="_Q' + questionIndex + '" id="' + answerNumber + '" value="' + $.inArray(newItem, question.answers) + '" required  />' +
            '<label for="' + answerNumber + '">' + newItem + '</label><br/>'
    });
    // return constructed items to main loop
    return itemsHTML;
}

// 4 - add function to render the state = add element to DOM - based on index - retrieve values from the question array

var renderQuiz = function (state, currentQuestion, targetElement) {
    var questionNumber = currentQuestion + 1;
    var legendHTML = '<legend> Question Number: ' + questionNumber + ' of ' + state.questions.length + ' </legend>';
    var questionHTML = '<div id="_Q' + currentQuestion + '_text">' + state.questions[currentQuestion].text + '</div>';
    var answersHTML = renderAnswers(state.questions[currentQuestion], currentQuestion);
    var submitHTML = 'Next Question';
    // insert constructed items
    $(targetElement).find('.js-legend-text').html(legendHTML); // overwrite element existing html with legendHTML - legend - question counter
    $(targetElement).find('.js-question-text').html(questionHTML); // overwrite element existing html with questionHTML - question text
    $(targetElement).find('.js-answer-text').html(answersHTML); // overwrite element existing html with answersHTML - answers
    $(targetElement).parent().find('.js-submit').html(submitHTML); // overwrite element existing html with submitHTML - button text
}

// loadScreen function - front page

var loadScreen = function(state){
    if (state.currentQuizState === 'startQuiz'){
        $('#start-section').css('display','block');
    } else if (state.currentQuizState === 'showQuiz'){
        $('#question-section').css('display','block');
    } else if (state.currentQuizState === 'endQuiz'){
        $('#end-section').css('display','block');
    }
}

// resetQuiz function - reset quiz to initial state

var resetQuiz    = function(state){       
    // Reset Quiz state to endQuiz
    state.currentQuizState = 'endQuiz'
}

// event handler - buttons

// Start page button
$('.start-quiz-button').click(function (event) {
    event.preventDefault(); // skip default functionality
    // Hide start page
    $('#start-section').css('display','none');
    // Reset Quiz state to showQuiz
    state.currentQuizState = 'showQuiz'
    //Load and show quiz page
    $('#question-section').css('display','block');
    loadQuestion(state, $('.js-question-fieldset'));  
});   

// End page button
$('.end-quiz-button').click(function (event) {
    event.preventDefault(); // skip default functionality
    // Hide end quiz page
    $('#end-section').css('display','none');
    // Reset Quiz state to startQuiz
    state.currentQuizState = 'startQuiz'
    // reset state array to initial state to restart game    
    state.score = 0;
    state.currentQuestion = 0;
    for (var i = 0; i < state.questions.length; i++){
        state.questions[i].result = false;
    }
    //Load and show start page
    loadScreen(state); 
});   

// Quiz submit button
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
            // Reset Quiz state to endQuiz
            state.currentQuizState = 'endQuiz'
            // Hide quiz page
            $('#question-section').css('display','none');
            //Load and show end page
            $('#end-section').css('display','block');
            loadScreen(state);
        }
    });

//==================================
$(function () { // callback function
    $('.nojs-warning').remove();
    loadScreen(state);
})
