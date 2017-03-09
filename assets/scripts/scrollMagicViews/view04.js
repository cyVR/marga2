var
  viewFourth = d.getElementById('viewFourth'),
  sceneFourth = new ScrollMagic.Scene({
    triggerElement: viewFourth,
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
