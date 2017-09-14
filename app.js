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
        text: "Who was a founder of Marvel Comics?",
        answers: ["Jack Kirby", "Steve Lee", "Stan Ditko", "Daniel Roose"],
        correct: 0, // 0 = Jack Kirby
        result: false,
        background: "<img src='images/marvel-comics-1.jpg' class='js-feedback-image' alt='Marvel Comics Nber 1' />",
        detail: "In the 1960s, Jack Kirby and Stan Lee co-created many of the Marvel characters, including the Fantastic Four, the X-Men and the Hulk."

    },
    {   // 1
        text: "Which of the following is a quote attributed to Uncle Ben?",
        answers: ["With awesome power comes some responsibility",
        "What power? I don't want no responsibility!",
        "With great power comes great responsibility.",
        "With no power, there are no responsibilities."],
        correct: 2, // 2 = With great power come great responsibilities.
        result: false,
        background: "<img src='images/uncleBen.jpg' class='js-feedback-image' alt='Marvel Comics Nber 1' />",
        detail: "Apparently, Uncle Ben was a fervent admirer of Winston Churchill, who said in 1906 <blockquote>&#8220;Where there is great power there is great responsibility&#8222;</blockquote>"
    }
    ,
    {   // 2
        text: "Who is Peter Parker's first love?",
        answers: ["Kitty Pryde", "Betty Brant", "Mary Jane", "Gwen Stacy"],
        correct: 3, // 3 = Gwen Stacy
        result: false,
        background: "<img src='images/PeterParker.png' class='js-feedback-image' alt='Peter Parker' />",
        detail: "Spider-Man writers and fans often debate whether Peter's <strong>one true love</strong> is Gwen Stacy, or Mary Jane Watson (Peter's later girlfriend and wife). Stories published long after her death indicate that Gwen still holds a special place in his heart."
    },
    {   // 4
        text: "Who is part of the Marvel Illuminati?",
        answers: ["Doctor Strange", "Black Panther", "Dr. Bruce Banner", "Magneto"],
        correct: 0, // 0 = Doctor Strange
        result: false,
        background: "<img src='images/illuminati.png' class='js-feedback-image' alt='Marvel Illuminati' />",
        detail: "The Illuminati are composed of Iron Man (representing the Avengers), Mister Fantastic (representing the Fantastic Four), Namor (representing Atlantis), Black Bolt (representing the Inhumans), Professor Xavier (representing the X-Men) and Doctor Strange (Sorcerer Supreme of Earth)."
    },
    {   // 5
        text: "Who wears the Eye of Agamotto?",
        answers: ["Iron Man", "The Ancient One", "Baron Mordo", "Dr. Strange"],
        correct: 3, // 3 = Doctor Strange
        result: false,
        background: "<img src='images/agamoto.png' class='js-feedback-image' alt='Eye of Agamoto' />",
        detail: "The Eye's origins are currently unknown, but there are theories of how it came into existence. Some believe that it was discovered by Agamotto among the seas and stars, where it had drifted for ages. Others claim that it was created by Agamotto himself."
    },
    {   // 6
        text: "Who is the son of Odin?",
        answers: ["Thor", "Hulk", "Loki", "Heimdall"],
        correct: 0, // 0 = Thor
        result: false,
        background: "<img src='images/odin.png' class='js-feedback-image' alt='Odin, the AllFather' />",
        detail: "Lee and Kirby included Thor in The Avengers #1 (Sept. 1963) as a founding member of the superhero team. The character has since appeared in every subsequent volume of the series."
    },
    {   // 7
        text: "Who is a member of the Fantastic Four?",
        answers: ["Tony Stark", "Johnny Storm", "Bruce Banner", "Steven Strange"],
        correct: 1, // 1 = Johnny Storm
        result: false,
        background: "<img src='images/FF.png' class='js-feedback-image' alt='Fantastic Four' />",
        detail: "As the first superhero team title produced by Marvel Comics, it formed a cornerstone of the company's 1960s rise from a small division of a publishing company to a pop culture conglomerate. The title would go on to showcase the talents of comics creators such as Roy Thomas, John Buscema, and is one of several Marvel titles originating in the Silver Age of Comic Books that was continuously published through 2015"
    },
    {   // 8
        text: "What were Wolverine's claws made of originally?",
        answers: ["Iron", "Bone", "Adamantium", "He did not have claws when he was born!"],
        correct: 1, // 1 = bone
        result: false,
        background: "<img src='images/claws.png' class='js-feedback-image' alt='Wolverine claws' />",
        detail: "Wolverine is typical of the many tough antiheroes that emerged in American popular culture after the Vietnam War; his willingness to use deadly force and his brooding nature became standard characteristics for comic book antiheroes by the end of the 1980s."
    },
    {   // 9
        text: "What makes Red Hulk stronger?",
        answers: ["Anger", "Gamma Radiation", "Electicity", "Heat"],
        correct: 1, // 1 = Gamma Radiation
        result: false,
        background: "<img src='images/redhulk.png' class='js-feedback-image' alt='Red Hulk' />",
        detail: "The Red Hulk can emit heat at will from his eyes during non-enraged periods, and can augment power levels by absorbing various types of energy, such as gamma radiation and the Power Cosmic. Red Hulk's body temperature rises with his anger and causes him to weaken when it becomes too intense."
    },
    {   // 10
        text: "What is Hulk's real name?",
        answers: ["Peter Parker", "Tony Stark", "Bruce Banner", "Viktor Von Doom"],
        correct: 2, // 2 = Bruce Banner
        result: false,
        background: "<img src='images/hulk.png' class='js-feedback-image' alt='The Hulk' />",
        detail: "Lee stated that the Hulk's creation was inspired by a combination of Frankenstein and Dr. Jekyll and Mr. Hyde. He has two main catchphrases: &#8220;Hulk is strongest one there is!&#8222 and the better-known &#8220;HULK SMASH!&#8222"
    },
    {   // 11
        text: "Who is a co-founder of Microsoft",
        answers: ["Bill Gates", "Tony Stark", "Steve Jobs", "Heat"],
        correct: 0, //0=Bill Gates,
        result: false,
        background: "<img src='images/microsoft.png' class='js-feedback-image' alt='Microsoft logo' />",
        detail: "Microsoft was founded by Paul Allen and Bill Gates on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800."
    },
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

var checkQuestion = function(state,selectedAnswer,targetElement){
    var currentIter = state.currentQuestion;
    // disable radio buttons
    $('input[type="radio"]').attr('disabled', true);
    // alert("check answer");
    if ( selectedAnswer === state.questions[currentIter].correct){
        state.questions[currentIter].result = true;
        state.score++;
    }
    state.currentQuestion++;
    $(targetElement).parent().find('.js-feedback-evaluation').html( (state.questions[currentIter].result ? 'That was right. ' : 'Sorry, you missed that one. ') + state.score + ' out of ' + state.currentQuestion + ' correct.'); // Hide Submit answer button   
    $(targetElement).parent().find('.js-feedback-details').html(state.questions[currentIter].detail); // Edit Side div content
    $(targetElement).parent().find('.js-feedback-evaluation').show();
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
    // insert constructed items
    $(targetElement).find('.js-legend-text').html(legendHTML); // overwrite element existing html with legendHTML - legend - question counter
    $(targetElement).find('.js-question-text').html(questionHTML); // overwrite element existing html with questionHTML - question text
    $(targetElement).find('.js-answer-text').html(answersHTML); // overwrite element existing html with answersHTML - answers
    $(targetElement).parent().find('.js-check-answer').css('display', 'block'); // Show check answer button
    $(targetElement).parent().find('.js-submit-answer').css('display', 'none'); // Hide Submit answer button
    $(targetElement).parent().find('.js-feedback-evaluation').hide();
    $(targetElement).parent().find('.js-feedback-details').html(state.questions[currentQuestion].background); // Edit Side div content
}

// loadScreen function - front page

var loadScreen = function(state){
    if (state.currentQuizState === 'startQuiz'){
        $('#start-section').css('display','block');
    } else if (state.currentQuizState === 'showQuiz'){
        $('#question-section').css('display','block');
    } else if (state.currentQuizState === 'endQuiz'){
        var scoreHTML = state.score + ' out of ' + state.questions.length;
        renderEndScreen(scoreHTML)
        $('#end-section').css('display','block');
    }
}

// endScreen function

var renderEndScreen = function(scoreHTML){
    $('#end-section').find('.js-end-score').html(scoreHTML);
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

// Quiz Check answer/submit button
//  Event Listener(s) to capture the added element, then create element (call addItem and renderList)
//  Use jQuery - check form class for submit

// Check answer button
$('.js-check-answer').click(function (event) {
    event.preventDefault(); // do not submit yet
    // add triggered functions
    // check function - the answer selected has to match the "correct answer" from the question array
    var unParsedAnswer = $('input[type=radio]:checked', '#hero-quizz-form').val();
    console.log(unParsedAnswer)
    var selectedAnswer = parseInt($('input[type=radio]:checked', '#hero-quizz-form').val()); // use parseInt else value returned is string
    if(!isNaN(selectedAnswer)){checkQuestion(state, selectedAnswer, $('.js-question-fieldset'));}; 
    // Check question number vs length of array question - load new questions or show reults
    var questionNumber = state.currentQuestion + 1; 
    $(this).css('display', 'none'); 
    $(this).siblings('.js-submit-answer').css('display', 'block'); // Show submit answer button
});

// submit answer button
$('#hero-quizz-form').submit(function (event) {
    event.preventDefault(); // do not submit yet
    // alert("submit answer");
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
