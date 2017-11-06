var ArtThrobQuizModels = {

  qas: {},

  questions_count: 0,

  answers_per_question: 5, // in the json file, be sure each question has this many possible answers

  init: function() {
    var data_url = 'quiz_models.json';

    $.ajax({
      type: 'GET',
      url: data_url,
      dataType: 'json',
      async: false,
      success: function(data) {
        ArtThrobQuizModels.qas = data;
        ArtThrobQuizModels.questions_count = data.questions.length;
        ArtThrobQuiz.init();
      },
      error: function(e) {
        console.error("Failed to retrieve " + data_url);
      }
    });
  }

};



var ArtThrobQuiz = {

  quiz_container_id: '#quiz-container',


  answers: [],


  init: function() {
    var target = $(ArtThrobQuiz.quiz_container_id);

    target.html(ArtThrobQuizViews.create_quiz().outerHTML);

    $('.artthrob-quiz').slick({
      infinite: false,
      draggable: false,
      swipe: false,
      easing: 'swing',
      arrows: false,
      speed: 500
    });

    var answer_click_callback = function(e) {
      var el = $(e.target),
          quiz = $('.artthrob-quiz'),
          self = $(this);

      if( el.hasClass('artthrob-answer') || el.parent().hasClass('artthrob-answer') ) {
        
        // don't double-tap
        $(this).off('click', answer_click_callback);

        ArtThrobQuiz.choose_answer(el);

        if(self.is(':last-child')) {
          var rid = ArtThrobQuiz.get_result_id();

          quiz.slickAdd(ArtThrobQuizViews.create_result_slide(rid));

          // push event to tag manager to track completion
          dataLayer.push({
            'event':'ArtThrobComplete',
            'event_response': rid
          });

        }

        quiz.artthrob-quiz.slickNext();
      }
    };

    target.find('.artthrob-question-slide').on('click', answer_click_callback);
  },


  choose_answer: function(el) {
    ArtThrobQuiz.answers.push(el.data('answer-value'));
  },


  get_result_id: function() {
    return _.chain(ArtThrobQuiz.answers).countBy().pairs().max(_.last).head().value();
  },

};



var ArtThrobQuizViews = {

  create_quiz: function() {
    var html = DIV({class: "artthrob-quiz"}, ArtThrobQuizViews.create_slides())
    return html;
  },


  create_slides: function() {
    var html = $.map(ArtThrobQuizModels.qas.questions, function(q, index) {
      return ArtThrobQuizViews.create_question_slide(index, q.question, q.answers, q.image, q.key);
    });
    return html;
  },


  create_question_slide: function(question_id, question, answers, image, answer_key) {
    var answer_content = DIV({class: "no-image"},
      ArtThrobQuizViews.create_answers_html(answers)
    );
    if (ArtThrobQuizViews.has_image(image)) {
      answer_content = DIV({class: "clearfix has-image"},
        ArtThrobQuizViews.add_image_to_slide(image),
        ArtThrobQuizViews.create_answers_html(answers)
      );
    }
    var html = DIV({class: "artthrob-quiz-slide artthrob-question-slide"},
      H2({class: "artthrob-question"}, 
         SPAN({class: "title-alignment-fix"}, $.parseHTML(question))),
      answer_content,
      ArtThrobQuizViews.create_answer_key_html(answer_key, question_id)
    );
    return html;
  },


  create_answers_html: function(answers) {
    var answers_html = $.map(answers, function(a, index) {
      var list_item = LI(A({class: "artthrob-answer button", dataAnswerValue: a.result}))
      $('.artthrob-answer',list_item).html(a.text);
      return list_item;
    });
    var html = DIV({class: "artthrob-answers-wrapper"},
      UL(answers_html)
    );
    return html;
  },


  create_answer_key_html: function(key, question_id) {
    if(typeof key != "undefined") {
      var html = DIV({class: "hidden-answer"},
        IMG({src: "key.png", alt: "Answer Key", class: "answer-key-link", dataQuestionId: "question-"+question_id}),
        P({class: "answer-key question-"+question_id})
      )
      $('.answer-key',html).html(key);
      return html;
    }
  },


  reveal_answer_key: function(question_id) {
    // $('.'+question_id).css('display','block');
    $('.'+question_id).slideToggle("slow");
  },


  has_image: function(image) {
    if(typeof image != "undefined") {
      return true;
    }
    return false;
  },


  add_image_to_slide: function(image) {
    var html, 
        caption;
    // var artist = $.parseHTML(ArtThrobQuizModels.qas.artist_credit_html);
    if(typeof image.caption != "undefined") {
      caption = P({class: "image-caption"},
        SPAN({class: "additional-caption"}, $.parseHTML(image.caption))
      );
    }

    if(typeof image != "undefined") {
      html = DIV({class: "artthrob-question-image"},
        IMG({src: image.path}),
        caption
      );
    }
    return html;
  },


  create_result_slide: function(result_id) {
    var result = ArtThrobQuizModels.qas.results[result_id];

    // render the slide
    var share_link = encodeURIComponent("http://" + window.location.host + "/art-throb?r=" + result_id);
    var html = DIV({class: "artthrob-quiz-slide artthrob-result-slide"},
      H2({class: "artthrob-result-text"}, 
         SPAN({class: "title-alignment-fix"}, result.title)),
      DIV({class: "row"},
        DIV({class: "small-12 medium-8 columns medium-offset-2 text-center"},
          IMG({class: "artthrob-result-image", src: result.image}),
          P({class: "result-explanation"}, $.parseHTML(result.explanation)),
          P({class: "image-caption"},
            SPAN({class: "additional-caption"}, 
                 $.parseHTML(result.caption))
          )
        ),
        DIV({class: "small-12 medium-2 columns"},
          A({href: "/art-throb", class: "button retake-button"}, "Take the Quiz Again"),
          A({id: "artthrob-social-share-facebook",
             class: "heart-button", 
             target: "_blank", 
             href: "http://www.facebook.com/share.php?u=" + share_link},
            IMG({src: "facebook-heart.png"})),
          A({id: "artthrob-social-share-twitter",
             class: "heart-button", 
             target: "_blank", 
             href: "http://twitter.com/share?text=I got " + 
                   result.title + ". Who's your %23ArtThrob? Take the quiz to find out.&url=" + 
                   share_link},
            IMG({src: "twitter-heart.png"}))
        )
      )
    );
    return html;
  },


  shuffle_array: function(arr) {
    // taken verbatim from http://www.jquery4u.com/snippets/jquery-output-array-random-order/
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  },


};



$(document).ready(function() {
  ArtThrobQuizModels.init();
  $(".answer-key-link").click( function() {
    ArtThrobQuizViews.reveal_answer_key($(this).data('question-id'));
  });
});
