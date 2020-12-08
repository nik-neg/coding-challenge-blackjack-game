
$( document ).ready(function() {
  document.querySelector(".start-button").addEventListener("click", function() {

    document.querySelector('.header').remove();

    document.querySelector('.dealer-cards').style.visibility  = 'visible';
    document.querySelector('.player-cards').style.visibility  = 'visible';
    document.querySelector('.play-buttons').style.visibility  = 'visible';


  });

  usedCardList = []

  document.querySelector(".next-button").addEventListener("click", function() {

    // get new cards for dealer
    let directoryPathOfImage = document.querySelector('.dealer-start-card').src;
    let newPath              = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf("illustration"))+"cards/";

    let leftCard = "";
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
    document.querySelector('.dealer-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.dealer-start-card-right').src = newPath+rightCard+".jpg";

    // get new cards for player
    directoryPathOfImage = document.querySelector('.player-start-card').src;
    newPath              = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf("illustration"))+"cards/";

    leftCard = "";
    while(usedCardList.indexOf(leftCard) === -1) {
      leftCard = (Math.floor(Math.random()*52)+1) % 53;
      usedCardList.push(leftCard)
      //console.log(usedCardList.indexOf(leftCard))
    }
    rightCard = "";
    while(usedCardList.indexOf(rightCard) === -1) {
      rightCard = (Math.floor(Math.random()*52)+1) % 53;
      usedCardList.push(rightCard)
      //console.log(usedCardList.indexOf(rightCard))
    }
    document.querySelector('.player-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.player-start-card-right').src = newPath+rightCard+".jpg";
  });
})



// set css property
//document.getElementById('id1').style.visibility = 'hidden';