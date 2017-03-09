var
  viewFifth = d.getElementById('viewFifth'),
  wipeSlider = d.getElementById('wipeSlider'),
  wipeSlider__box = d.getElementsByClassName('wipeSlider__box')[0],
  wipeSlider__window = d.getElementsByClassName('wipeSlider__window')[0],
  wipeSlider__slidesAll = d.getElementsByClassName('wipeSlider__slide');
var
  wipeSlider__slidesCount = wipeSlider__window.childElementCount,
  wipeSlider__angle = (180 - (360 / wipeSlider__slidesCount)) / 2,
  wipeSlider__angleRound = Math.round(wipeSlider__angle),
  wipeSlider__slideTranslateZ = (w.innerWidth / 2) / Math.tan(Math.PI / wipeSlider__slidesCount);
wipeSlider__slideTranslateZRound = Math.round(wipeSlider__slideTranslateZ);

// chrome bug backdore ******************
var tempSheet = d.createElement('style');
tempSheet.innerHTML += '.wipeSlider__window {transform: rotateY(0deg)}';
Array.prototype.forEach.call(wipeSlider__slidesAll, function(e, i) {
  var nth = i + 1;
  tempSheet.innerHTML += '.wipeSlider__slide:nth-of-type(' + nth + ') {transform: rotateY(' + i * (360 / wipeSlider__slidesCount) + 'deg) translateZ(' + wipeSlider__slideTranslateZRound + 'px)}';
});
d.body.appendChild(tempSheet);
// ***************************************

var wipeAnimation = new TimelineMax()
.to(wipeSlider__window, 1, {
  rotationY: 60
})
.to(wipeSlider__window, 1, {
  rotationY: 120
})
.to(wipeSlider__window, 1, {
  rotationY: 180
})
.to(wipeSlider__window, 1, {
  rotationY: 240
})
.to(wipeSlider__window, 1, {
  rotationY: 300
});
// for (var i = 1; i < wipeSlider__slidesCount ; i++) {
//   var rotacja = i * wipeSlider__angleRound;
//   wipeAnimation.to(wipeSlider__window, 1, {
//     rotationY: -1*rotacja
//   });
// }

var
  sceneFifth = new ScrollMagic.Scene({
    triggerElement: viewFifth,
    triggerHook: 'onLeave',
    duration: (wipeSlider__slidesCount + 1) * 100 + '%'
  })
  .setPin(viewFifth)
  .setTween(wipeAnimation)
  .addIndicators()
  .addTo(controller);

console.log(
  'viewFifth = ' + viewFifth + '\n' +
  'wipeSlider = ' + wipeSlider + '\n' +
  'wipeSlider__box = ' + wipeSlider__box + '\n' +
  'wipeSlider__window = ' + wipeSlider__window + '\n' +
  'wipeSlider__slidesAll = ' + wipeSlider__slidesAll + '\n' +
  'wipeSlider__slidesCount = ' + wipeSlider__slidesCount + '\n' +
  'wipeSlider__angle = ' + wipeSlider__angle + '\n' +
  'wipeSlider__angleRound = ' + wipeSlider__angleRound + '\n' +
  'wipeSlider__slideTranslateZ = ' + wipeSlider__slideTranslateZ + '\n' +
  'wipeSlider__slideTranslateZRound = ' + wipeSlider__slideTranslateZRound + '\n'
);
