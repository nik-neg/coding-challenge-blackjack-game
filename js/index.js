
$( document ).ready(function() {
  document.querySelector(".start-button").addEventListener("click", function() {

    document.querySelector('.header').remove();

    // add before images

    $(".dealer-cards").append("<h1 class='points player-points'>Player: </h1>")
    // <h1 class="points player-points">21</h1>
    // <h1 class="points dealer-points">21</h1>

    document.querySelector('.dealer-cards').style.visibility  = 'visible';
    document.querySelector('.player-cards').style.visibility  = 'visible';
    document.querySelector('.play-buttons').style.visibility  = 'visible';


  });

  let blackJack = false;
  let isJack    = false;
  let isAce     = false;

  let dealersTurn = false;
  let playersTurn = false;

  //usedCardList = [] // maybe not neccessary

  document.querySelector(".next-button").addEventListener("click", function() {

    // get new cards for dealer
    let directoryPathOfImage = document.querySelector('.dealer-start-card').src;
    let newPath              = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf("illustration"))+"cards/";

    /*
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
    */
    let leftCard = (Math.floor(Math.random()*52)+1) % 53;
    let rightCard = (Math.floor(Math.random()*52)+1) % 53;
    document.querySelector('.dealer-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.dealer-start-card-right').src = newPath+rightCard+".jpg";

    // set dealer points
    let leftCardValue  = mapNumberToCardValue(leftCard);
    let rigthCardValue = mapNumberToCardValue(rightCard);
    console.log(leftCard)
    console.log(leftCardValue)
    $(".dealer-points").text("Dealer: "+(leftCardValue+rigthCardValue));

    // get new cards for player
    directoryPathOfImage = document.querySelector('.player-start-card').src;
    newPath              = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf("illustration"))+"cards/";

    /*
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
    */
    leftCard = (Math.floor(Math.random()*52)+1) % 53;
    rightCard = (Math.floor(Math.random()*52)+1) % 53;
    document.querySelector('.player-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.player-start-card-right').src = newPath+rightCard+".jpg";

    leftCardValue  = mapNumberToCardValue(leftCard);
    rigthCardValue = mapNumberToCardValue(rightCard);
    $(".player-points").text("Player: "+(leftCardValue+rigthCardValue));
  });
})

let lookUpTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,"jack", "jack", "jack", "jack", "ace", "ace", "ace", "ace"]
function mapNumberToCardValue(cardNumber) {
  return lookUpTable[cardNumber-1]; // -1 for the right indexing
}
console.log(lookUpTable[23])

document.querySelector(".hit-button").addEventListener("click", function() {
  console.log("Hit")
});

document.querySelector(".stand-button").addEventListener("click", function() {
  console.log("Stand")
});

// set css property
//document.getElementById('id1').style.visibility = 'hidden';