window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};
var
  d = document,
  w = window,
  controller = new ScrollMagic.Controller({}),
  scrollingList = Array.prototype.map.call(d.getElementsByClassName('scrollToSection'), function(ele) {
    var array = [];
    array.push(ele.id);
    if (ele.getElementsByClassName('movieConteiner')[0] !== undefined) {
      array.push(1);
      return array;
    } else {
      array.push(0);
      return array;
    }
  });
var mouseMove = new TimelineMax({
  repeat: -1,
  yoyo: true
});
mouseMove.to('#mouseArrow', 1.2, {
  y: 6,
  ease: Back.easeIn.config(1.7)
});

function addEventListenerByClass(className, event, fn) {
  var list = document.getElementsByClassName(className);
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

function round(value, decimals = 3) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function indexInScrollingList(name) {
  for (var i = 0; i < scrollingList.length; i++) {
    if (scrollingList[i][0] == name) {
      break;
    }
  }
  return i;
}
// Object to controll movie with mouse
function movieMovement(container) {
  this.container = container;
  this.videoName = container.getAttribute('video');
  this.videoDuration = Number(container.getAttribute('duration'));
  this.videoContainer = container.getElementsByClassName('movieConteiner')[0];
  this.movie = [];
  this.accel = 0;
  this.accelamount = 0.4; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
  this.bounceamount = 0; //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce
  this.scrollpos = 0;
  this.targetscrollpos = 0;
  this.movieSpeed = 0;
  this.playStatus = 'true';
}

movieMovement.prototype = {
  constructor: movieMovement,
  log: function() {
    console.log(this);
  },
  movieMaker: function() {
    var videoTag = d.createElement('video');
    videoTag.innerHTML += '<source type="video/mp4" src="./dist/video/' + this.videoName + '.mp4"></source>';
    videoTag.innerHTML += '<source type="video/ogg" src="./dist/video/' + this.videoName + '.ogv"></source>';
    videoTag.innerHTML += '<source type="video/webm" src="./dist/video/' + this.videoName + '.webm"></source>';
    this.videoContainer.appendChild(videoTag);
    this.movie = videoTag;
  },
  loadedMetaData: function() {
    this.movieSpeed = round(w.innerWidth / this.videoDuration);
    this.scrollpos = round(this.videoDuration / 2);
    this.targetscrollpos = this.scrollpos;
    console.log(
      'LoadMetaData \n'+
      'w.innerWidth= ' + w.innerWidth + '\n' +
      'this.videoDuration= ' + this.videoDuration + '\n' +
      'this.movieSpeed(round)= ' + this.movieSpeed + '\n' +
      'this.movieSpeed(floor)= ' + Math.floor(w.innerWidth / this.videoDuration) + '\n' +
      'w.innerWidth / this.videoDuration= ' + w.innerWidth / this.videoDuration
    );
  },
  mousemove: function() {
    var self = this;
    this.container.addEventListener("mousemove", function(e) {
      if (self.playStatus == 'true') {
        self.targetscrollpos = round(e.clientX / self.movieSpeed);
        console.log(self.targetscrollpos);
      } else {
        return false;
      }
    });
  },
  interval: function() {
    var self = this;
    window[this.container.id + 'intervalLoop'] = setInterval(function() {
      //Accelerate towards the target:
      self.accel += (self.targetscrollpos - self.scrollpos) * self.accelamount;
      //clamp the acceleration so that it doesnt go too fast
      if (self.accel > 1) self.accel = 1;
      if (self.accel < -1) self.accel = -1;
      //move the video scroll position according to the acceleration and how much bouncing you selected:
      self.scrollpos = round((self.scrollpos + self.accel) * (self.bounceamount) + (self.targetscrollpos * (1 - self.bounceamount)));
      //update video playback
      if (self.scrollpos > self.videoDuration) self.scrollpos = self.videoDuration;
      self.movie.currentTime = self.scrollpos;
      self.movie.pause();
    }, 40);
    //intervalLoop;
  },
  intervalOff: function() {
    clearInterval(window[this.container.id + 'intervalLoop']);
  },
  playNow: function() {
    this.playStatus = 'true';
    this.mousemove();
    this.interval();
  },
  playOff: function() {
    this.playStatus = 'false';
    this.intervalOff();
  }
};

function getMetadata(e) {
  var m = e.getElementsByTagName('video');
  window[e.id + 'Movie'] = new movieMovement(e, e.getElementsByTagName('video'));
  window[e.id + 'Movie'].loadedMetaData();
}

function sceneActivator(e, direction) {
  var ele;
  if (direction == 'DOWN' || direction == 'UP') {
    for (var i = 0; i < 2; i++) {
      if (direction == 'DOWN') {
        ele = scrollingList[e + i];
        if (ele[1] > 0) {
          if (window[ele[0] + 'Movie'] === undefined) {
            window[ele[0] + 'Movie'] = new movieMovement(d.getElementById(ele[0]));
            window[ele[0] + 'Movie'].movieMaker();
            window[ele[0] + 'Movie'].loadedMetaData();
          }
        }
      } else if (direction == 'UP') {
        ele = scrollingList[e - i];
        if (ele[1] > 0) {
          if (window[ele[0] + 'Movie'] === undefined) {
            window[ele[0] + 'Movie'] = new movieMovement(d.getElementById(ele[0]));
            window[ele[0] + 'Movie'].movieMaker();
          }
        }
      }
    }
  } else {
    console.log('Wrong direction !! only UP and DOWN');
  }
}

function sceneOff(i) {
  if (scrollingList[i][1] > 0) {
    window[scrollingList[i][0] + 'Movie'].playOff();
  }
}

function scrollDown(e) {
  var scenka = e.target.triggerElement();
  var scenkaId = scenka.id;
  if (e.scrollDirection == 'FORWARD') {
    TweenMax.to(w, 2, {
      scrollTo: {
        y: scenka,
        autoKill: false
      }
    });
    sceneActivator(indexInScrollingList(scenka.id), 'DOWN');
    if (scrollingList[indexInScrollingList(scenka.id)][1] > 0) {
      window[scenkaId + 'Movie'].playNow();
    }
    sceneOff(indexInScrollingList(scenka.id) - 1);
  }
}

function scrollUp(e) {
  if (e.scrollDirection == 'REVERSE') {
    var scenka = indexInScrollingList(e.target.triggerElement().id) - 1;
    if (scenka === 0) {
      TweenMax.to(w, 2, {
        scrollTo: {
          y: 1.5 * w.innerHeight,
          autoKill: false
        }
      });
    } else {
      TweenMax.to(w, 2, {
        scrollTo: {
          y: d.getElementById(scrollingList[scenka][0]),
          autoKill: false
        }
      });
      if (scrollingList[scenka][1] > 0) {
        window[scrollingList[scenka][0] + 'Movie'].playNow();
      }
      sceneOff(scenka - 1);
    }
    console.log(scenka);
  }
}

controller.scrollTo(function(newpos) {
  TweenMax.to(w, 0.5, {
    scrollTo: {
      y: newpos,
      autoKill: false
    }
  });
});

addEventListenerByClass('nav--link', 'click', function(e) {
  e.preventDefault();
  controller.scrollTo(d.getElementById(this.hash.slice(1)));

});
