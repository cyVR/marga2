var
  viewOne = d.getElementById('viewOne'),
  viewOne__video = d.getElementsByClassName('viewOne__fixedContainer--video')[0].childNodes[1],
  viewOne__text = d.getElementsByClassName('viewOne__fixedContainer--text'),
  accel = 0,
  accelamount = 0.01, //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
  bounceamount = 0.91, //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce
  scrollpos = 0,
  targetscrollpos = 0,
  viewOne__videoSpeed = 1;
var
 scrollMovieInterval;
var flying__text = new TimelineMax()
  .fromTo(viewOne__text[0], 1, {
    x: w.innerWidth,
    y: -1 * viewOne__video.offsetHeight
  }, {
    x: viewOne__video.offsetWidth + (viewOne__text[0].offsetWidth / 2),
    ease: Linear.easeNone
  })
  .fromTo(viewOne__text[1], 1, {
    x: -1 * w.innerWidth,
    y: viewOne__video.offsetHeight
  }, {
    x: -1 * (viewOne__video.offsetWidth + (viewOne__text[1].offsetWidth / 2)),
    ease: Linear.easeNone
  }, '-=1');

var sceneOne = new ScrollMagic.Scene({
    triggerElement: viewOne,
    triggerHook: 'onEnter',
    offset: -1,
    duration: w.innerHeight * 2.5 - 1,
    reverse: true,
    // loglevel: 3
  })
  .addIndicators()
  .setTween(flying__text)
  .setClassToggle('.viewOne__fixedContainer', 'sticked')
  .addTo(controller);

function movieScroll() {
  this.movie = d.getElementsByClassName('viewOne__fixedContainer--video')[0].childNodes[1];
  this.accel = 0;
  this.accelamount = 0.01; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
  this.bounceamount = 0.91; //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce
  this.videoDuration = 34.201;
  this.scrollpos = 0;
  this.targetscrollpos = 0;
  this.movieSpeed = 0;
  this.playStatus = true;
}

movieScroll.prototype = {
  constructor: movieScroll,
  log: function() {
    console.log(this);
  },
  loadedMetaData: function() {
    this.movieSpeed = Math.floor(w.innerHeight * 1.5 / Math.floor(this.videoDuration));
    this.scrollpos = round(w.pageYOffset / this.movieSpeed);
    this.targetscrollpos = this.scrollpos;
  },
  scrollListener: function() {
    viewOneMovie.targetscrollpos = window.pageYOffset / viewOneMovie.movieSpeed;
  },
  scrollMove: function() {
    w.addEventListener('scroll', this.scrollListener);
  },
  scrollOff: function() {
    w.removeEventListener('scroll', this.scrollListener);
  },
  interval: function() {
    var self = this;
    scrollMovieInterval = setInterval(function() {
      //Accelerate towards the target:
      self.accel += (self.targetscrollpos - self.scrollpos) * self.accelamount;
      //clamp the acceleration so that it doesnt go too fast
      if (self.accel > 1) self.accel = 1;
      if (self.accel < -1) self.accel = -1;
      //move the video scroll position according to the acceleration and how much bouncing you selected:
      self.scrollpos = round((self.scrollpos + self.accel) * (self.bounceamount) + (self.targetscrollpos * (1 - self.bounceamount)));
      //update video playback
      self.movie.currentTime = self.scrollpos;
      self.movie.pause();
    }, 40);
  },
  intervalOff: function() {
    clearInterval(scrollMovieInterval);
  },
  playNow: function() {
    this.playStatus = 'true';
    this.scrollMove();
    this.interval();
  },
  playOff: function() {
    this.playStatus = 'false';
    this.intervalOff();
    this.scrollOff();
  }
};
var viewOneMovie = new movieScroll();
viewOneMovie.loadedMetaData();
viewOneMovie.movie.addEventListener('loadedmetadata', function() {
  viewOneMovie.playNow();
});
