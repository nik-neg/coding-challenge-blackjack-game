$( document ).ready(function() {
  document.querySelector(".play-button").addEventListener("click", function() {

    document.querySelector('.header').remove();
    //document.querySelector('.header').style.visibility  = 'hidden';

    document.querySelector('.dealer-cards').style.visibility  = 'visible';
    document.querySelector('.player-cards').style.visibility  = 'visible';


  });
})



// set css property
//document.getElementById('id1').style.visibility = 'hidden';