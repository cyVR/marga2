var
  viewThird = d.getElementById('viewThird'),
  viewThird__video = d.getElementsByClassName('viewThird__video')[0],
  sceneThird = new ScrollMagic.Scene({
    triggerElement: viewThird,
    triggerHook: 'onEnter',
    offset: 20,
    duration: w.innerHeight - 40
  })
  .on('start', function(e) {
    scrollDown(e);
  })
  .on('enter', function(e) {
    scrollUp(e);
  })
  .addIndicators()
  .addTo(controller);
// viewThird__video.addEventListener('loadedmetadata', function(e) {
//   viewThird__videoSpeed = w.innerWidth / viewThird__video.duration;
//   scrollpos = viewThird__video.duration / 2;
//   targetscrollpos = scrollpos;
// });
// viewThird.addEventListener("mousemove", function(e) {
//   targetscrollpos = e.clientX / viewThird__videoSpeed;
// });
// setInterval(function() {
//
//   //Accelerate towards the target:
//   accel += (targetscrollpos - scrollpos) * accelamount;
//
//   //clamp the acceleration so that it doesnt go too fast
//   if (accel > 1) accel = 1;
//   if (accel < -1) accel = -1;
//
//   //move the video scroll position according to the acceleration and how much bouncing you selected:
//   scrollpos = (scrollpos + accel) * (bounceamount) + (targetscrollpos * (1 - bounceamount));
//
//   //update video playback
//   //console.log(scrollpos);
//   viewThird__video.currentTime = scrollpos;
//   viewThird__video.pause();
//
// }, 40);
