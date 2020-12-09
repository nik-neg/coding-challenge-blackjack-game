
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

  document.querySelector(".next-button").addEventListener("click", function() {
    
    let pathToCheck          = "";
    if(startOfGame) {
      pathToCheck = "illustration";
      startOfGame = false;
    } else {
      pathToCheck = "cards"
    }
    getNewCards("dealer", pathToCheck);
    getNewCards("player", pathToCheck)
    /*
    // get new cards for dealer
    let leftCard = (Math.floor(Math.random()*52)+1) % 53;
    let rightCard = (Math.floor(Math.random()*52)+1) % 53;

    let directoryPathOfImage = document.querySelector('.dealer-start-card').src;
    
    let pathToCheck          = "";
    let newPath              = "";

    if(startOfGame) {
      pathToCheck = "illustration";
      startOfGame = false;
    } else {
      pathToCheck = "cards"
    }

    newPath = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf(pathToCheck))+"cards/";
    document.querySelector('.dealer-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.dealer-start-card-right').src = newPath+rightCard+".jpg";

    // set dealer points
    let leftCardValue  = mapNumberToCardValue(leftCard);
    let rigthCardValue = mapNumberToCardValue(rightCard);
    let points         = leftCardValue+rigthCardValue;
    if ((leftCardValue === 10 && rigthCardValue ==="ace") || (leftCardValue === "ace" && rigthCardValue === 10) ) {
      points = "Black Jack";
    }
    $(".dealer-points").text("Dealer: "+(points));
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // get new cards for player
    directoryPathOfImage = document.querySelector('.player-start-card').src;
    newPath              = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf("illustration"))+"cards/";

    leftCard = (Math.floor(Math.random()*52)+1) % 53;
    rightCard = (Math.floor(Math.random()*52)+1) % 53;
    document.querySelector('.player-start-card-left').src  = newPath+leftCard+".jpg";
    document.querySelector('.player-start-card-right').src = newPath+rightCard+".jpg";

    leftCardValue  = mapNumberToCardValue(leftCard);
    rigthCardValue = mapNumberToCardValue(rightCard);
    points         = leftCardValue+rigthCardValue;
    if ((leftCardValue === 10 && rigthCardValue ==="ace") || (leftCardValue === "ace" && rigthCardValue === 10) ) {
      points = "Black Jack";
    }
    $(".player-points").text("Player: "+(points));
    */
  });
})

function getNewCards(opponent, pathToCheck) {
      // get new cards for dealer
      let leftCard = (Math.floor(Math.random()*52)+1) % 53;
      let rightCard = (Math.floor(Math.random()*52)+1) % 53;
  
      let directoryPathOfImage = document.querySelector(`.${opponent}-start-card`).src;
      
      let newPath              = "";
  
      newPath = directoryPathOfImage.slice(0, directoryPathOfImage.indexOf(pathToCheck))+"cards/";
      document.querySelector(`.${opponent}-start-card-left`).src  = newPath+leftCard+".jpg";
      document.querySelector(`.${opponent}-start-card-right`).src = newPath+rightCard+".jpg";
  
      // set dealer points
      let leftCardValue  = mapNumberToCardValue(leftCard);
      let rigthCardValue = mapNumberToCardValue(rightCard);
      let points         = leftCardValue+rigthCardValue;
      if ((leftCardValue === 10 && rigthCardValue ==="ace") || (leftCardValue === "ace" && rigthCardValue === 10) ) {
        points = "Black Jack";
      }
      $(`.${opponent}-points`).text(`${opponent[0].toUpperCase()+opponent.slice(1, opponent.length)}: ${points}`);
}

let lookUpTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10, 10, 10, 10, "ace", "ace", "ace", "ace"]
function mapNumberToCardValue(cardNumber) {
  return lookUpTable[cardNumber-1]; // -1 for the right indexing
}

document.querySelector(".hit-button").addEventListener("click", function() {
  console.log("Hit")
});

document.querySelector(".stand-button").addEventListener("click", function() {
  console.log("Stand")
  console.log($(".player-points").text())
  //if ()
});
