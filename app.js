(function () {
    $('#game').hide();
    $('#contact').hide();
    $('#score').hide();
    $('#main').show();

    var Game = (function () {
        var _questionSet = [{
            questionId: 1,
            questionText: "Pytanie nr 1",
            answers: [{
                id: 1,
                text: "Odpowiedz 1",
                isCorrect: false
            },
            {
                id: 2,
                text: "Odpowiedz 2",
                isCorrect: true
            },
            {
                id: 3,
                text: "Odpowiedz 3",
                isCorrect: false
            },
            {
                id: 4,
                text: "Odpowiedz 4",
                isCorrect: false
            },
            ]
        },
        {
            questionId: 2,
            questionText: "huehuehuehue",
            answers: [{
                id: 1,
                text: "( ͡° ͜ʖ ͡°)",
                isCorrect: false
            },
            {
                id: 2,
                text: "(卐 ͜ʖ 卐)",
                isCorrect: true
            },
            {
                id: 3,
                text: "（╯°□°）╯︵ ┻━┻",
                isCorrect: false
            },
            {
                id: 4,
                text: "( ͡° ͜ʖ ͡°)━☆ﾟ.*･｡ﾟ",
                isCorrect: false
            },
            ]
        },
        {
            questionId: 3,
            questionText: "ktora odpowiedz to samogoloska?",
            answers: [{
                id: 1,
                text: "AAAAA",
                isCorrect: true
            },
            {
                id: 2,
                text: "BEEEE",
                isCorrect: false
            },
            {
                id: 3,
                text: "TSE",
                isCorrect: false
            },
            {
                id: 4,
                text: "DEEEEE",
                isCorrect: false
            },
            ]
        },
        {
            questionId: 4,
            questionText: "Skad pochodzi Bialy wilk?",
            answers: [{
                id: 1,
                text: "Z mokotowa",
                isCorrect: false
            },
            {
                id: 2,
                text: "z Betlejem",
                isCorrect: false
            },
            {
                id: 3,
                text: "z Sosnowca",
                isCorrect: false
            },
            {
                id: 4,
                text: "z Rivii",
                isCorrect: true
            },
            ]
        },
        {
            questionId:5,
            questionText: "Pytanie milion",
            answers: [{
                id: 1,
                text: "a moze",
                isCorrect: false
            },
            {
                id: 2,
                text: "pytania",
                isCorrect: false
            },
            {
                id: 3,
                text: "rowniez",
                isCorrect: true
            },
            {
                id: 4,
                text: "pomieszac?",
                isCorrect: false
            },
            ]
        }];

        var _currentQuestion = null;
        var _pickedQuestions = [];
        var _correctAnswers = 0;
        var _currentStep = 0;

        function Game(){

        };

        function _startNewGame() {
            _resetGame();
        };

        function _resetGame(){
            _pickedQuestions = [];
            _correctAnswers = 0;
            _currentStep = 0;
        }

        function _getQuestion(){
            if(_currentStep === 5)
            {
                return null;
            }
            else
            {
                var questionIndex = 0;
                do{
                    questionIndex = Math.floor(Math.random() * _questionSet.length);
                }
                while(_contains(_pickedQuestions, questionIndex));
    
                _pickedQuestions.push(questionIndex);
                _currentQuestion = _questionSet[questionIndex];
                _currentStep++;

                return _currentQuestion;
            }
        }

        function _answerQuestion(answerId){
            var i = _currentQuestion.answers.length;
            while(i--){
                if(_currentQuestion.answers[i].id === answerId && _currentQuestion.answers[i].isCorrect)
                {
                    _correctAnswers++;
                    return true;
                }
            }
            return false;
        }

        function _contains(array, obj) {
            var i = array.length;
            while (i--) {
               if (array[i] === obj) {
                   return true;
               }
            }
            return false;
        }

        Game.prototype.StartGame = function(){
            return _startNewGame.call(this);
        }
        Game.prototype.GetQuestion = function(){
            return _getQuestion.call(this);
        }
        Game.prototype.AnswerQuestion = function(answerId){
            return _answerQuestion.call(this,answerId);
        }
        Game.prototype.GetSummary = function(){
            return _correctAnswers;
        }

        return Game;
    })();

var Game = new Game();

$('button#start').click(function(){
    $('#main').hide();
    $('#game').show();

    Game.StartGame();
    var question = Game.GetQuestion();
    SetQuestion(question);
});

$('#answers button').click(function(){
    $('#answers button').attr("disabled", true);
    if(Game.AnswerQuestion($(this).data('answer')))
    {
        ShowCorrect();
    }
    else
    {
        ShowIncorrect();
    }

    HideResult();
    setTimeout(() => {
        GetNextQuestion();
        $('#result .summary').removeClass('success').removeClass('fail');
        $('#answers button').attr("disabled", false);
    }, 1500);
});

$("#gotomain").click(function(){
    $('#main').show();
    $('#score').hide();
});

function SetQuestion(question){
    $('#game #question .text').text(question.questionText);

    $('#game #answers #answer1').text(question.answers[0].text).data('answer',question.answers[0].id);
    $('#game #answers #answer2').text(question.answers[1].text).data('answer',question.answers[1].id);
    $('#game #answers #answer3').text(question.answers[2].text).data('answer',question.answers[2].id);
    $('#game #answers #answer4').text(question.answers[3].text).data('answer',question.answers[3].id);
}

function ShowCorrect(){
    $('#result .summary').addClass('success').text('Poprawna odpowiedz!').show();
}

function ShowIncorrect(){
    $('#result .summary').addClass('fail').text('Bledna odpowiedz :(').show();
}

function HideResult(){
    setTimeout(() => {
        $('#result .summary').hide();
    }, 1500);
}

function GetNextQuestion(){
    var question = Game.GetQuestion()
    if(question !== null)
    {
        SetQuestion(question);
    }
    else{
        ShowSummary();
    }
}

function ShowSummary(){
    $('#game').hide();
    $('#score').show();

    var correctAnserws = Game.GetSummary();
    $('#score .summary').text('Odpowiedziano poprawnie na '+ correctAnserws+' pytan z 5');
}

})();