// define movement of panels
var
  viewFifth = d.getElementById('viewFifth'),
  wipeSlider = d.getElementById('wipeSlider'),
  wipeSliderController = d.getElementsByClassName('wipeSlider--controller')[0],
  wipeSliderChildren = wipeSliderController.childElementCount,
  wipeSliderSlides = d.getElementsByClassName('wipeSlider__slide'),
  wipeSliderDeg = (180 - (360 / wipeSliderChildren)) / -2,
  wipeAnimation = new TimelineMax(),
  wipeSliderSlidesTZ = Math.round((w.innerWidth / 2) / Math.tan(Math.PI / wipeSliderChildren));
console.log(wipeSliderSlidesTZ);
//wipeSlider.style.transform = 'translateZ(-' + wipeSliderSlidesTZ * 2.25 + 'px)';
wipeSlider.style.width = wipeSliderChildren * 100 + '%';
 // Array.prototype.forEach.call(wipeSliderSlides, function(e, i) {
 //   //e.style.transform = 'rotateY(' + i * (360 / wipeSliderChildren) + 'deg) translateZ(' + wipeSliderSlidesTZ + 'px)';
 //  //  TweenMax.set(e, {
 //  //    transform: 'rotateY(' + i * (360 / wipeSliderChildren) + 'deg) translateZ(' + wipeSliderSlidesTZ + 'px)'
 //  //  });
 //  console.log(e);
 // });
// TweenMax.set(wipeSliderController, {
//   transform: 'translateZ(10px)'
// })
// chrome bug backdore ******************
var tempSheet = d.createElement('style');
tempSheet.innerHTML = '.wipeSlider {transform: translateZ(-' + wipeSliderSlidesTZ *2+ 'px);}';
Array.prototype.forEach.call(wipeSliderSlides, function(e, i) {
  var nth = i + 1;
  tempSheet.innerHTML += '.wipeSlider__slide:nth-of-type(' + nth + ') {transform: rotateY(' + i * (360 / wipeSliderChildren) + 'deg) translateZ(' + wipeSliderSlidesTZ + 'px)}';
});
d.body.appendChild(tempSheet);
// ***************************************
for (var i = 1; i <= wipeSliderChildren - 1; i++) {
  // wipeAnimation.to(wipeSlider, 1, {
  //   //rotateY: '' + (360 / wipeSliderChildren)  + 'deg'
  //   opacity: -0.1
  // }, '-=1');
  // if (i === 1) {
  //   wipeAnimation.to(wipeSlider, 0.5, {
  //     z: -150
  //   });
  // }
  wipeAnimation.to(wipeSliderController, 1, {
    rotateY: '-' + (360 / wipeSliderChildren) + 'deg'
  });
  // if (i >= 1) {
  //   wipeAnimation.to(wipeSliderSlides[i-1], 1, {
  //     transformOrigin: '100% 0%',
  //     rotationY: wipeSliderDeg
  //   }, '-=1');
  // }
  // if (i === wipeSliderChildren-1) {
  //   wipeAnimation.to(wipeSlider, 0.5, {
  //     z: 0
  //   });
  // }
}

var
  sceneFifth = new ScrollMagic.Scene({
    triggerElement: viewFifth,
    triggerHook: 'onLeave',
    duration: (wipeSliderChildren + 1) * 100 + '%'
  })
  .on('start', function(e) {
    //scrollDown(e);
  })
  .on('enter', function(e) {
    //scrollUp(e);
  })
  .setPin(viewFifth)
  .setTween(wipeAnimation)
  .addIndicators()
  .addTo(controller);
