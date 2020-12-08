$( document ).ready(function() {
  document.querySelector(".start-button").addEventListener("click", function() {

    document.querySelector('.header').remove();

    document.querySelector('.dealer-cards').style.visibility  = 'visible';
    document.querySelector('.player-cards').style.visibility  = 'visible';
    document.querySelector('.play-buttons').style.visibility  = 'visible';


  });

  usedCardList = []

  document.querySelector(".next-button").addEventListener("click", function() {

    // get new cards
    //let tempString = "file:///C:/Users/krisc/Documents/TH_Arbeitsgruppe/9/UDEMY-COURSERA/PROGRAMMING%20BOOTCAMP%20PREPARATION/programming-bootcamp-admission-challenge/images/illustration/Red_back.jpg";
    //console.log(tempString.indexOf(illustration))
    let directoryPathOfImage = document.querySelector('.dealer-start-card').src;
    let newPath              = directoryPathOfImage.slice(0, tempString.indexOf(illustration));

    let leftCard = "";
    let i = 0;
    while(usedCardList.indexOf(leftCard) === -1) {
      leftCard = (Math.floor(Math.random()*52)+1) % 53;
      usedCardList.push(leftCard)
      //console.log(usedCardList.indexOf(leftCard))
    }
    let rightCard = "";
    while(usedCardList.indexOf(rightCard) === -1) {
      rightCard = (Math.floor(Math.random()*52)+1) % 53;
      usedCardList.push(rightCard)
      //console.log(usedCardList.indexOf(rightCard))
    }
    document.querySelector('.dealer-start-card').src = 


    document.querySelector('.dealer-cards').style.visibility  = 'visible';
    document.querySelector('.player-cards').style.visibility  = 'visible';


  });
})



// set css property
//document.getElementById('id1').style.visibility = 'hidden';