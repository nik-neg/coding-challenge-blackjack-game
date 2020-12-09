
$( document ).ready(function() {
  document.querySelector(".start-button").addEventListener("click", function() {

  document.querySelector('.header').remove();

  $(".dealer-cards").append("<h1 class='points player-points'>Player: </h1>")

  document.querySelector('.dealer-cards').style.visibility  = 'visible';
  document.querySelector('.player-cards').style.visibility  = 'visible';
  document.querySelector('.play-buttons').style.visibility  = 'visible';


  });

  let blackJack = false;

  let playersTurn = true;

  let startOfGame = true;

  let resultDealer = 0;
  let resultPlayer = 0;

  document.querySelector(".next-button").addEventListener("click", function() {
    playersTurn = true;
    // removes images after hit abd stand for the next game
    let addedImages = document.querySelectorAll('.player-start-card-new');
    for (let i = 0; i<addedImages.length; i++) {
      addedImages[i].remove();
    }
    addedImages = document.querySelectorAll('.dealer-start-card-new');
    for (let i = 0; i<addedImages.length; i++) {
      addedImages[i].remove();
    }
    if(document.querySelector(".winner") !== null) {
      document.querySelector(".winner").remove();
    }

    let pathToCheck = "";
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
    if ((leftCardValue === 10 && rigthCardValue ==="ace") || (leftCardValue === "ace" && rigthCardValue === 10)) {
      points = "Black Jack";
    } else {
        if (leftCardValue === "ace" && opponent === "player") {
          leftCardValue = defineAceValue(leftCardValue, rigthCardValue);
        }
        if (rigthCardValue === "ace" && opponent === "player") {
          rigthCardValue = defineAceValue(rigthCardValue, leftCardValue);
        }
            // for dealer
        if (rigthCardValue === "ace" && opponent === "dealer") {
          rigthCardValue = 11;
        }
        if (leftCardValue === "ace" && opponent === "dealer") {
          leftCardValue = 11;
        }
        points = leftCardValue+rigthCardValue;
      }

    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${points}`);
  }

function checkWinner(resultDealer, resultPlayer) {

  if(resultDealer !== "Black Jack") {
    resultDealer = parseInt(resultDealer);
  }
  if(resultPlayer !== "Black Jack") {
    resultPlayer = parseInt(resultPlayer);
  }
  console.log(typeof resultDealer, resultDealer)
  console.log(typeof resultPlayer, resultPlayer)

  if (resultDealer === resultPlayer && (resultPlayer === "Black Jack")) {
    $(".intro").append("<h1 class='winner'>Draw!</h1>")
  } else if ((resultDealer === "Black Jack" || (resultDealer > resultPlayer) && resultDealer <= 21) || (resultPlayer > 21)) {
    //console.log("dealer wins")
    $(".dealer-points").css('color', 'white');
    $(".player-points").css('color', 'red');
  } else if ((resultPlayer === "Black Jack" || (resultDealer < resultPlayer) && resultPlayer <= 21) || (resultDealer > 21)) {
    //console.log("player wins")
    $(".dealer-points").css('color', 'red');
    $(".player-points").css('color', 'white');
  } else {
    $(".dealer-points").css('color', 'red');
    $(".player-points").css('color', 'red');
  }
}


document.querySelector(".hit-button").addEventListener("click", function() {
  console.log("Hit")
  if(!startOfGame && extractResults("player") <= 20 && playersTurn) {
    // hit new card
    hitNewCard("player");
    //let newCard = hitNewCard("player");
    //let newCardTag = `<img class='player-start-card player-start-card-new' src='images/cards/${newCard}' alt='no-red-pic'>`;
    //$(".player-cards").append(newCardTag);

    resultDealer = extractResults("dealer");
    resultPlayer = extractResults("player");
    checkWinner(resultDealer, resultPlayer);
  }
});

function hitNewCard(opponent) {
  let pathToCheck = "cards";
  let newCard = (Math.floor(Math.random()*52)+1) % 53;

  let resultPlayer = 0;
  if (mapNumberToCardValue(newCard) !== "ace") {
    resultPlayer = parseInt(extractResults(opponent)) + parseInt(mapNumberToCardValue(newCard));
  } else {
    resultPlayer = parseInt(extractResults(opponent)) + defineAceValueWhenHit(); 
  }
  console.log("hit stand dealer"+resultPlayer)

  $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${resultPlayer}`);

  let newCardTag = `<img class='${opponent}-start-card ${opponent}-start-card-new' src='images/cards/${newCard}.jpg' alt='no-red-pic'>`;
  $(`.${opponent}-cards`).prepend(newCardTag);

  //return newCard+".jpg";
}

  document.querySelector(".stand-button").addEventListener("click", function() {
    console.log("Stand");
    playersTurn = false;
    if(!startOfGame && extractResults("dealer") <= 20) {
      stand();
    }
  });

  function defineAceValue(cardValue, otherCardValue) {
    if (
      confirm(`You have ${cardValue} and ${otherCardValue}. Do you want to threat the ace as 11? Then please click 'yes', otherwise no for 1`)) {
      return 11;
    } else {
      return 1;
    }
  }

  function defineAceValueWhenHit() {
    if (
      confirm(`You have an ace. Do you want to threat the ace as 11? Then please click 'ok', otherwise 'abort'' for 1`)) {
      return 11;
    } else {
      return 1;
    }
  }

  function stand() {
    hitNewCard("dealer");
    resultDealer = extractResults("dealer");
    resultPlayer = extractResults("player");
    checkWinner(resultDealer, resultPlayer);
  }

});