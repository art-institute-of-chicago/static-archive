audiojs.events.ready(function() {

  var as = audiojs.createAll({
    css: false,
    createPlayer: {
      markup: '\
          <div class="left"> \
            <div class="play-pause"> \
              <i class="play fa fa-play" aria-hidden="true"></i> \
              <i class="pause fa fa-pause" aria-hidden="true></i> \
              <i class="loading"></i> \
              <i class="error"></i> \
            </div> \
          </div> \
          <div class="middle"> \
            <div class="title"></div> \
            <div class="subtitle"></div> \
            <div class="scrubber"> \
              <div class="progress"></div> \
              <div class="loaded"></div> \
            </div> \
          </div> \
          <div class="right"> \
            <div class="time"> \
              <em class="played">0:00</em>/<strong class="duration">0:00</strong> \
            </div> \
          </div> \
          <div class="error-message"></div>',
      playPauseClass: 'play-pause',
      scrubberClass: 'scrubber',
      progressClass: 'progress',
      loaderClass: 'loaded',
      timeClass: 'time',
      durationClass: 'duration',
      playedClass: 'played',
      errorMessageClass: 'error-message',
      playingClass: 'playing',
      loadingClass: 'loading',
      errorClass: 'error'
    }
  });
  var elems = document.getElementsByClassName('audiojs');
  for(var i = 0; i < elems.length; i++) {
    $('.middle .title', elems[i]).html($('p.title', elems[i]).html());
    $('.middle .subtitle', elems[i]).html($('p.subtitle', elems[i]).html());
  }
  $('.play').on('click', function() {
    var el = audiojs.instances;
    for (var pl in el) {
      el[pl].pause();
    }
  });

});
