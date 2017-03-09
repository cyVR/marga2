var
  viewSecond = d.getElementById('viewSecond'),
  sceneSecond = new ScrollMagic.Scene({
    triggerElement: viewSecond,
    triggerHook: 'onEnter',
    offset: 20,
    duration: w.innerHeight - 40
  })
  .on('start', function(e) {
    scrollDown(e);
    if (e.scrollDirection == 'FORWARD') {
      //viewOneMovie.playOff();
    }
    //console.log(e);
  })
  .on('enter', function(e) {
    scrollUp(e);
    if (e.scrollDirection == 'REVERSE') {
      //viewOneMovie.playNow();
    }
  })
  .addIndicators()
  .addTo(controller);
