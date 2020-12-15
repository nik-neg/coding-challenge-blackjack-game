
$( document ).ready(function() {

  // state of the game
  let STATE        = "START";

  // start button listener
  document.querySelector(".start-button").addEventListener("click", function() {
  
  STATE = "PLAY";

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
  let cardDeck     = []
  let winThreshold = 21;
  let BLACKJACK    = "Black Jack";
  let playerHasBlackJack  = false;
  let cardDict     = {"player": [], "dealer": []}



  // next button listener
  document.querySelector(".next-button").addEventListener("click", function() {
    if (STATE !== "PLAY" && STATE !== "NEXT" && !gameOver) {
      return;
    }
    STATE = "NEXT";
    console.log("---------------------------------")
    resetResults("player");
    resetResults("dealer");
    playersTurn  = true;
    playerHasBlackJack  = false;
    cardDeck     = []
    cardDict     = {"player": [], "dealer": []}
 

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

    } else {
      pathToCheck = "cards"
    }

    getNextCards("dealer", pathToCheck);
    resultDealer = extractResults("dealer");
    getNextCards("player", pathToCheck);
    resultPlayer = extractResults("player");


    checkWinner(resultDealer, resultPlayer);
    startOfGame = false;

    console.log(cardDeck.length);
  });

  function removeDealersCoveredCard() {
    if (document.querySelector('.dealer-start-card-left') !== null) {
      document.querySelector('.dealer-start-card-left').remove();
    }
  }

  // function to generate and display the new cards
  function getNextCards(opponent, pathToCheck) {
    // get new cards
    let leftCard = -1;
    leftCard = putNewCardIntoListOfUsedCards(leftCard);
    console.log("left card: "+leftCard)

    // set points for player
    let leftCardValue  = mapNumberToCardValue(leftCard);
    let cards = []
    cards[0]  = leftCardValue;

    // get path of cards
    let directoryPathOfImage = document.querySelector(`.${opponent}-start-card`).src;

    checkCoveredCards = "illustration";
    if (directoryPathOfImage.indexOf(checkCoveredCards) !== -1) {
      pathToCheck = checkCoveredCards;
    }
    
    // set new cards to the path
    let newPath = "";
    newPath = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf(pathToCheck))+"cards/";
    
    if (opponent === "player") {
      //rightCard = (Math.floor(Math.random()*52)+1) % 53;
      let rightCard = -1;
      rightCard = putNewCardIntoListOfUsedCards(rightCard);
      console.log("right card: "+rightCard)

      document.querySelector(`.${opponent}-start-card-left`).src = newPath+rightCard+".jpg";
      let rigthCardValue = mapNumberToCardValue(rightCard);
      cards[1]  = rigthCardValue;

      // put cards into the dictionary to recalculate aces if neccassary
      rememberCards(opponent, rigthCardValue)
    }

    if (gameOver || STATE === "NEXT") {
      removeDealersCoveredCard();

      let opponent = "dealer";
      let newCardTag = `<img class='${opponent}-start-card ${opponent}-start-card-left' src='images/illustration/Red_back.jpg' alt='no-red-pic'>`;
      $(`.${opponent}-cards`).prepend(newCardTag);
      gameOver    = false;
    }

    document.querySelector(`.${opponent}-start-card-right`).src  = newPath+leftCard+".jpg";

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    let pointsAceFlagCardsLength = null;

    // calculate
    pointsAceFlagCardsLength = calculate(extractResults(opponent), cards);
    // put cards into the dictionary to recalculate aces if neccassary
    rememberCards(opponent, leftCardValue)

    //display the cards
    displayPoints(opponent, pointsAceFlagCardsLength); 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  function rememberCards(opponent, cardValue) {
    cardDict[`${opponent}`].push(cardValue)
  }

  function putNewCardIntoListOfUsedCards(card) { // Fehler ?: gibt undefined zurück
    console.log("gived card: "+card, !cardDeck.includes(card))
    while(true) {
      card = (Math.floor(Math.random()*52)+1) % 53; // it's possible to get a card which is alredy inside, then it should continue!
      if (!cardDeck.includes(card)) {
        console.log("pushed card: "+card)
        cardDeck.push(card);
        //break;
        console.log(cardDeck)
        //cardDeck.forEach( card => { console.log(mapNumberToCardValue(card))})
        console.log("returned card: "+cardDeck[cardDeck.length-1])
        return cardDeck[cardDeck.length-1]; // WRONG: returns muplitple times last el.
      }
    }
  }

  // the card are named regarding their indizes -1 e.g: 1-4 is two, 5-8 is three and so on
  let lookUpTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10, 10, 10, 10, "ace", "ace", "ace", "ace"]
  function mapNumberToCardValue(cardNumber) {
    return lookUpTable[cardNumber - 1]; // -1 for the right indexing
  }

  // function to get the actual values
  function extractResults(opponent) {
    let result = $(`.${opponent}-points`).text();
    return result.slice(8, result.length) !== BLACKJACK ? parseInt(result.slice(8, result.length)) : BLACKJACK;
  }

  // function to reset the values
  function resetResults(opponent) {
    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: 0`);
    resultDealer = 0;
    resultPlayer = 0;
  }

  // function to display the values and differ the ace value
  function displayPoints(opponent, pointsAceFlagCardsLength) {
    let result = pointsAceFlagCardsLength[0];
    if (result === 21 && pointsAceFlagCardsLength[1] && pointsAceFlagCardsLength[2]) {
      result = BLACKJACK;
      gameOver = true;
      playerHasBlackJack = true;
      $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${result}`);

      if (extractResults("dealer") >= 10 && playerHasBlackJack) { // if dealer also can hit a Black Jack
        stand(playerHasBlackJack);
      }
    }
    else if (result === 21) { // after next 10 or 11 to BJ makes output not BJ,
      $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${result}`);
      stand(playerHasBlackJack);
    }
    
    $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${result}`);
  }

  function calculate(actualPoints, cards) {
    let points = actualPoints;
    let aceFlag = false;

    cards.forEach(card => {
      if (card !== "ace") {
        points += card;
      } else {
        aceFlag = true;
        if (points + 11 > winThreshold) {
          points += 1;
        } else {
          points += 11;
        }
      } 
    });
    return [points, aceFlag, cards.length === 2] // Object.keys(dictionary).length //  || (cards === "ace" && actualPoints === 10)
  }

  // function to check the temporary winner
  function checkWinner(resultDealer, resultPlayer) {

    if(document.querySelector(".winner") !== null) {
      document.querySelector(".winner").remove();
    }
    if(resultDealer !== BLACKJACK) {
      resultDealer = parseInt(resultDealer);
    }
    if(resultPlayer !== BLACKJACK) {
      resultPlayer = parseInt(resultPlayer);
    }

    console.log(resultDealer, resultPlayer)

    console.log("check winner: "+resultDealer+" : "+cardDict["dealer"]+" - "+cardDict["dealer"].length, cardDict["dealer"].length === 2);

    let dealerColor = "red";
    let playerColor = "red";
    let checkDealerBlackJackAfterNext = ((resultPlayer === BLACKJACK) || (resultPlayer === 21))  && (resultDealer === 21 && cardDict["dealer"].length === 2);
    // both have Black Jack
    if (resultDealer === resultPlayer && (resultPlayer === BLACKJACK) || checkDealerBlackJackAfterNext) {
      opponent = "dealer";
      $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${BLACKJACK}`);
      gameOver = true;
      $(".intro").append("<h1 class='winner'>Draw!</h1>");
      dealerColor = "white";
      playerColor = "white";
      // dealer has Black JackWW
    } else if (resultDealer === 21 && cardDict["dealer"].length === 2) {
      opponent = "dealer";
      $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${BLACKJACK}`);
      gameOver = true;
      $(".intro").append("<h1 class='winner'>Dealer wins!</h1>");
      dealerColor = "white";
      playerColor = "red";
      // player has Black Jack
    } else if (resultPlayer === BLACKJACK) {
      $(".intro").append("<h1 class='winner'>Player wins!</h1>");
      gameOver = true;
      dealerColor = "red";
      playerColor = "white";
      // dealer has more points, or player busted
    } else if (((resultDealer > resultPlayer) && resultDealer <= 21) || (resultPlayer > 21)) {
      $(".intro").append("<h1 class='winner'>Dealer wins!</h1>")
      dealerColor = "white";
      playerColor = "red";
      // player has more points, or dealer busted
    } else if (((resultDealer < resultPlayer) && resultPlayer <= 21) || resultDealer > 21) {
      $(".intro").append("<h1 class='winner'>Player wins!</h1>");
      dealerColor = "red";
      playerColor = "white";
    } else { // both player has same points
      $(".intro").append("<h1 class='winner'>Draw!</h1>")
      dealerColor = "white";
      playerColor = "white";
    }
    $(".dealer-points").css('color', dealerColor);
    $(".player-points").css('color', playerColor);
  }

  // hit button listener
  document.querySelector(".hit-button").addEventListener("click", function() {
    if (STATE !== "HIT" && STATE !== "NEXT" || STATE === "START" || gameOver) {
      return;
    }
    STATE = "HIT";

    if(!startOfGame && !gameOver && extractResults("player") <= 20 && playersTurn) {
      // hit new card
      hitNewCard("player");

      resultDealer = extractResults("dealer");
      resultPlayer = extractResults("player");

      checkWinner(resultDealer, resultPlayer);
    }

    // player busts
    if (resultPlayer > 21 ) {
      STATE        = "NEXT";
      gameOver     = true;
    } else if (resultPlayer === 21) {
      STATE        = "STAND";
      stand(playerHasBlackJack);
    }
  });

  // function to hit a new card
  function hitNewCard(opponent) {
    let newCard = -1;
    newCard     = putNewCardIntoListOfUsedCards(newCard);
    console.log(newCard);

    let mappenCardValue = mapNumberToCardValue(newCard);
    
    // calculate
    let pointsAceFlagCardsLength = calculate(extractResults(opponent), [mappenCardValue]);

    // put cards into the dictionary to recalculate aces if neccassary
    rememberCards(opponent, mappenCardValue);

    pointsAceFlagCardsLength[0] = aceOption(opponent, mappenCardValue);

    displayPoints(opponent, pointsAceFlagCardsLength)


    let newCardTag = `<img class='${opponent}-start-card ${opponent}-start-card-new' src='images/cards/${newCard}.jpg' alt='no-red-pic'>`;
    $(`.${opponent}-cards`).prepend(newCardTag);
    console.log(cardDeck.length);
  }
  // stand button listener
  document.querySelector(".stand-button").addEventListener("click", function() {
    if (STATE !== "HIT" && STATE !== "NEXT" || gameOver) {
      return;
    }
    STATE = "STAND";

    playersTurn = false;

    if(!startOfGame && !gameOver) {
      stand(playerHasBlackJack);
    }
  });

  // function for recalculation of the ace if neccessary
  function aceOption(opponent, newCard) { // mappenCardValue
    let result    = extractResults(opponent);
    let newResult = 0;
    newCard       = newCard === "ace" ? 11 : newCard;
    if (result + newCard > winThreshold) {
      cardDict[opponent].forEach(card => {
        newResult += card !== "ace" ? card : 1;
      });
    } else {
      newResult = extractResults(opponent) + newCard;
    }
    return newResult;
  }

  // function to activate the hit part of the dealer if it is neccessary
  function stand(playerHasBlackJack) {
    removeDealersCoveredCard();

    resultDealer = extractResults("dealer");
    resultPlayer = extractResults("player");

    let oneRun = playerHasBlackJack ? 1 : -1;

    let dealerBound = 17;
    let hitCardsForDealer =  (resultDealer < dealerBound)
    while(hitCardsForDealer) {
      hitNewCard("dealer");
      resultDealer = extractResults("dealer");
      hitCardsForDealer =  (resultDealer < dealerBound)

      if (playerHasBlackJack) { // breaks out if the player has a Black Jack and the dealer has 10 or 11 and can hit once for a Black Jack, too.
        break;
      }
    }

    console.log("------------------------------")

    checkWinner(resultDealer, resultPlayer);
    STATE        = "NEXT";
    //resultDealer = 0;
    //resultPlayer = 0;
    gameOver     = true;
  }
});