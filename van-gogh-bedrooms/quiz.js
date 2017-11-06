(function() {

  var quizApp = angular.module('vanGoghQuiz', []);

  quizApp.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]);

  quizApp.filter('debug', function() {
    return function(input) {
      if (input === '') return 'empty string';
      return input ? input : ('' + input);
    };
  });

  quizApp.controller('QuizController', ['$scope','$http','$sce', function($scope,$http,$sce) {

    $scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.resultSlideIndex = 0;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0;
    $scope.resultsRanges = [];
    $scope.earnedResult = {
      title: "",
      description: "",
      image: "VanGogh--Bedroom--1889--ArtInstituteChicago--1025.jpg"
    };

    var jsonFile = 'quiz-data.json';
    // var jsonFile = 'quiz-data-test.json';

    $http.get(jsonFile).then(function(quizData) {
      $scope.questions = quizData.data.quiz;
      $scope.resultsRanges = quizData.data.results;
      $scope.totalQuestions = $scope.questions.length;
      $scope.resultSlideIndex = $scope.totalQuestions + 1;
    });


    $scope.selectAnswer = function(qIndex, aIndex) {

      var questionState = $scope.questions[qIndex].questionState;

      if( questionState != 'answered' ) {
        $scope.questions[qIndex].selectedAnswer = aIndex;
        var correctAnswer = $scope.questions[qIndex].correct;
        $scope.questions[qIndex].correctAnswer = correctAnswer;

        if( aIndex === correctAnswer ) {
          $scope.questions[qIndex].correctness = 'correct';
          $scope.score++;
        } else {
          $scope.questions[qIndex].correctness = 'incorrect';
        }

        $scope.questions[qIndex].questionState = 'answered';
      }

      $scope.percentage = Math.round(( ( $scope.score / $scope.totalQuestions ) * 100 ).toFixed(2));

    }

    $scope.isSelected = function(qIndex, aIndex) {
      return $scope.questions[qIndex].selectedAnswer === aIndex;
    }

    $scope.isCorrect = function(qIndex, aIndex) {
      return $scope.questions[qIndex].correctAnswer === aIndex;
    }

    $scope.nextQuestion = function(qIndex) {
      if( $scope.activeQuestion + 1 === $scope.totalQuestions) {
        $scope.getEarnedResult($scope.percentage);
        $scope.quizComplete($scope.percentage);
      }
      return $scope.activeQuestion++;
    }

    $scope.getEarnedResult = function(percentage) {
      var earnedResult = $scope.resultsRanges.filter(function(element) {
        if(Math.floor(percentage) >= element.score_range[0] && Math.floor(percentage) <= element.score_range[1]) {
          return true;
        }
      });
      $scope.earnedResult = earnedResult[0];
    }

    $scope.htmlify = function(string) {
      return $sce.trustAsHtml(string);
    }


    $scope.quizComplete = function(percentage) {
      dataLayer.push({
        'event': 'VanGoghQuizComplete',
        'quizCompleted': $scope.totalQuestions
      });
    }

    window.onbeforeunload = function(e){
      if($scope.activeQuestion >= 1 && $scope.activeQuestion + 1 < $scope.totalQuestions) {
        dataLayer.push({
          'event': 'VanGoghQuizAbandoned',
          'quizAbandonedOnQuestion': $scope.activeQuestion
        });
      }
    };
  }]);

})();
