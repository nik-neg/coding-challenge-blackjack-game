
$( document ).ready(function() {
  document.querySelector(".start-button").addEventListener("click", function() {

  document.querySelector('.header').remove();

  $(".dealer-cards").append("<h1 class='points player-points'>Player: </h1>")

  document.querySelector('.dealer-cards').style.visibility  = 'visible';
  document.querySelector('.player-cards').style.visibility  = 'visible';
  document.querySelector('.play-buttons').style.visibility  = 'visible';


  });

  let blackJack = false;
  let isJack    = false;
  let isAce     = false;

  let dealersTurn = false;
  let playersTurn = false;

  let startOfGame = true;

  let resultDealer = 0;
  let resultPlayer = 0;

  document.querySelector(".next-button").addEventListener("click", function() {

    // removes images after hit for the next game
    let addedImages = document.querySelectorAll('.player-start-card-new');
    for (let i = 0; i<addedImages.length; i++) {
      addedImages[i].remove();
    }
    
    let pathToCheck          = "";
    if(startOfGame) {
      pathToCheck = "illustration";
      startOfGame = false;
    } else {
      pathToCheck = "cards"
    }
    
    getNewCards("dealer", pathToCheck);
    resultDealer = extractResults("dealer");
    getNewCards("player", pathToCheck);
    resultPlayer = extractResults("player");

    checkWinner(resultDealer, resultPlayer);

  });


  function getNewCards(opponent, pathToCheck) {
    // get new cards
    let leftCard = (Math.floor(Math.random()*52)+1) % 53;
    let rightCard = (Math.floor(Math.random()*52)+1) % 53;

    let directoryPathOfImage = document.querySelector(`.${opponent}-start-card`).src;
    
    let newPath = "";

    newPath = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf(pathToCheck))+"cards/";
    document.querySelector(`.${opponent}-start-card-left`).src  = newPath+leftCard+".jpg";
    document.querySelector(`.${opponent}-start-card-right`).src = newPath+rightCard+".jpg";

    // set points
    let leftCardValue  = mapNumberToCardValue(leftCard);
    let rigthCardValue = mapNumberToCardValue(rightCard);

    // option for ace
    displayPoints(opponent, leftCardValue, rigthCardValue);
  }

  let lookUpTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10, 10, 10, 10, "ace", "ace", "ace", "ace"]
  function mapNumberToCardValue(cardNumber) {
    return lookUpTable[cardNumber-1]; // -1 for the right indexing
  }

  function extractResults(opponent) {
    let result = $(`.${opponent}-points`).text();
    return result.slice(8, result.length);
  }

  function displayPoints(opponent, leftCardValue, rigthCardValue) {
    
    let points = leftCardValue+rigthCardValue;
    if ((leftCardValue === 10 && rigthCardValue ==="ace") || (leftCardValue === "ace" && rigthCardValue === 10) ) {
      points = "Black Jack";
    }
    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${points}`);
  }

function checkWinner(resultDealer, resultPlayer) {
  if (resultDealer === resultPlayer && (resultPlayer === "Black Jack")) {
    $(".intro").append("<h1 class='winner'>Draw!</h1>")
  } else if (resultDealer > resultPlayer) {
    $(".dealer-points").css('color', 'white');
    $(".player-points").css('color', 'red');
  } else if (resultDealer <= resultPlayer) {
    $(".dealer-points").css('color', 'red');
    $(".player-points").css('color', 'white');
  }
}


document.querySelector(".hit-button").addEventListener("click", function() {
  console.log("Hit")
  if(!startOfGame) {
  // hit new card
  let newCard = hitNewCard("player");
  let newCardTag = `<img class='player-start-card player-start-card-new' src='images/cards/${newCard}' alt='no-red-pic'>`;
  $(".player-cards").append(newCardTag);
  }
});

function hitNewCard(opponent) {
  let pathToCheck = "cards";
  let newCard = (Math.floor(Math.random()*52)+1) % 53;
  let resultPlayer = parseInt(extractResults("player")) + parseInt(mapNumberToCardValue(newCard));
  $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${resultPlayer}`);
  return newCard+".jpg";
}

  document.querySelector(".stand-button").addEventListener("click", function() {
    console.log("Stand")
    console.log($(".player-points").text())
  });

});