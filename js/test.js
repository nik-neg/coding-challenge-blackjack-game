/* test file
*/
const path = require('path')
usedCardList = []

let tempString = "file:///C:/Users/krisc/Documents/TH_Arbeitsgruppe/9/UDEMY-COURSERA/PROGRAMMING%20BOOTCAMP%20PREPARATION/programming-bootcamp-admission-challenge/images/illustration/Red_back.jpg";
let directoryPathOfImage = tempString
let newPath              = directoryPathOfImage.slice(0, tempString.indexOf("illustration"))+"cards"+path.sep;

let leftCard = "";
let i = 0;
while(usedCardList.indexOf(leftCard) === -1) {
    leftCard = (Math.floor(Math.random()*52)+1) % 53;
    usedCardList.push(leftCard)
    console.log(usedCardList.indexOf(leftCard))
}
let rightCard = "";
while(usedCardList.indexOf(rightCard) === -1) {
    rightCard = (Math.floor(Math.random()*52)+1) % 53;
    usedCardList.push(rightCard)
    console.log(usedCardList.indexOf(rightCard))
}



console.log(newPath)
console.log(leftCard, rightCard)