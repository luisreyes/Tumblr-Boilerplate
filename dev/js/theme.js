(function(){

  var elements = {};

  document.addEventListener('scroll', onBodyScroll);

  var amount = 2;

  // Cache Header Section
  var h = document.getElementsByTagName('header')[0];
  // Add Scroll Listener
  document.addEventListener('scroll', onBodyScroll);
  // Listener Function
  function onBodyScroll(e){
    // Set Style
    h.style.backgroundPositionY= window.pageYOffset/amount +'px';
  }

}());