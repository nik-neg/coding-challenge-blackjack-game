
$( document ).ready(function() {
  // start button listener
  document.querySelector(".start-button").addEventListener("click", function() {

  document.querySelector('.header').remove();

  $(".dealer-cards").append("<h1 class='points player-points'>Player: </h1>")
  
  // makes the game visible
  document.querySelector('.dealer-cards').style.visibility  = 'visible';
  document.querySelector('.player-cards').style.visibility  = 'visible';
  document.querySelector('.play-buttons').style.visibility  = 'visible';
  });

  let gameOver     = false;
  let playersTurn  = true;
  let startOfGame  = true;
  let resultDealer = 0;
  let resultPlayer = 0;

  // next button listener
  document.querySelector(".next-button").addEventListener("click", function() {
    resetResults("player");
    resetResults("dealer");
    gameOver    = false;
    playersTurn = true;

    // removes images after hit and stand for the next game
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

    // determines the proper folder for the cards
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

  // function to generate and display the new cards
  function getNewCards(opponent, pathToCheck) {
    // get new cards
    let leftCard = (Math.floor(Math.random()*52)+1) % 53;
    let rightCard = (Math.floor(Math.random()*52)+1) % 53;

    // get path of cards
    let directoryPathOfImage = document.querySelector(`.${opponent}-start-card`).src;
    
    // set new cards to the path
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

  // the card are named regarding their indizes -1 e.g: 1-4 is two, 5-8 is three and so on
  let lookUpTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10, 10, 10, 10, "ace", "ace", "ace", "ace"]
  function mapNumberToCardValue(cardNumber) {
    return lookUpTable[cardNumber - 1]; // -1 for the right indexing
  }

  // function to get the actual values
  function extractResults(opponent) {
    let result = $(`.${opponent}-points`).text();
    return result.slice(8, result.length);
  }

  // function to reset the values
  function resetResults(opponent) {
    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: 0`);
  }

  // function to display the values and differ the ace value
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

  // function to check the temporary winner
  function checkWinner(resultDealer, resultPlayer) {
    if(document.querySelector(".winner") !== null) {
      document.querySelector(".winner").remove();
    }
    if(resultDealer !== "Black Jack") {
      resultDealer = parseInt(resultDealer);
    }
    if(resultPlayer !== "Black Jack") {
      resultPlayer = parseInt(resultPlayer);
    }

    if (resultDealer === resultPlayer && (resultPlayer === "Black Jack")) {
      gameOver = true;
      $(".intro").append("<h1 class='winner'>Draw!</h1>")
      $(".dealer-points").css('color', 'white');
      $(".player-points").css('color', 'white');
    } else if (resultDealer === "Black Jack") {
      $(".intro").append("<h1 class='winner'>Dealer wins!</h1>")
      gameOver = true;
      $(".dealer-points").css('color', 'white');
      $(".player-points").css('color', 'red');
    } else if (resultPlayer === "Black Jack") {
      $(".intro").append("<h1 class='winner'>Player wins!</h1>")
      gameOver = true;
      $(".dealer-points").css('color', 'red');
      $(".player-points").css('color', 'white');
    } else if (((resultDealer > resultPlayer) && resultDealer <= 21) || (resultPlayer > 21)) {
      $(".intro").append("<h1 class='winner'>Dealer wins!</h1>")
      $(".dealer-points").css('color', 'white');
      $(".player-points").css('color', 'red');
    } else if (((resultDealer < resultPlayer) && resultPlayer <= 21) || resultDealer > 21) {
      $(".intro").append("<h1 class='winner'>Player wins!</h1>")
      $(".dealer-points").css('color', 'red');
      $(".player-points").css('color', 'white');
    } else {
      $(".intro").append("<h1 class='winner'>Draw!</h1>")
      $(".dealer-points").css('color', 'white');
      $(".player-points").css('color', 'white');
    }
  }

  // hit button listener
  document.querySelector(".hit-button").addEventListener("click", function() {
    if(!startOfGame && extractResults("player") <= 20 && playersTurn) {
      // hit new card
      hitNewCard("player");

      resultDealer = extractResults("dealer");
      resultPlayer = extractResults("player");
      checkWinner(resultDealer, resultPlayer);
    }
  });

  // function to hit a new card
  function hitNewCard(opponent) {
    let pathToCheck = "cards";
    let newCard = (Math.floor(Math.random()*52)+1) % 53;

    let resultPlayer = 0;
    if (mapNumberToCardValue(newCard) !== "ace") {
      resultPlayer = parseInt(extractResults(opponent)) + parseInt(mapNumberToCardValue(newCard));
    } else {
      resultPlayer = parseInt(extractResults(opponent)) + defineAceValueWhenHit(); 
    }

    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${resultPlayer}`);

    let newCardTag = `<img class='${opponent}-start-card ${opponent}-start-card-new' src='images/cards/${newCard}.jpg' alt='no-red-pic'>`;
    $(`.${opponent}-cards`).prepend(newCardTag);
  }
  // stand button listener
  document.querySelector(".stand-button").addEventListener("click", function() {
    playersTurn = false;
    if(!startOfGame && extractResults("dealer") <= 20 && !gameOver) {
      stand();
    }
  });

  // function which asks the player how the Ace should be treated
  function defineAceValue(cardValue, otherCardValue) {
    if (
      confirm(`You have ${cardValue} and ${otherCardValue}. Do you want to treat the Ace as 11? Then please click 'yes', otherwise no for 1.`)) {
      return 11;
    } else {
      return 1;
    }
  }

  // same as above, but this function also generically serves the dealer when the player chooses stand 
  function defineAceValueWhenHit() {
    if (
      confirm(`Dealer has an Ace. Do you want to treat the Ace as 11? Then please click 'ok', otherwise 'abort'' for 1.`)) {
      return 11;
    } else {
      return 1;
    }
  }

  // function to activate the hit part of the dealer if it is neccessary
  function stand() {
    resultDealer = parseInt(extractResults("dealer"));
    resultPlayer = parseInt(extractResults("player"));
    while(resultDealer <= resultPlayer && resultDealer <= 21 && resultPlayer < 21) {
      hitNewCard("dealer");
      resultDealer = extractResults("dealer");
    }
    checkWinner(resultDealer, resultPlayer);
    resultDealer = 0;
    resultPlayer = 0;
  }
});