var
  viewSix = d.getElementById('viewSix'),
  viewSix = new ScrollMagic.Scene({
    triggerElement: viewSix,
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
