// All code should be written in this file.

let playerOneMoveOneType;
let playerOneMoveOneValue;
let playerOneMoveTwoType;
let playerOneMoveTwoValue;
let playerOneMoveThreeType;
let playerOneMoveThreeValue;
let playerTwoMoveOneType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoType;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeType;
let playerTwoMoveThreeValue;

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, 
    moveTwoValue, moveThreeType, moveThreeValue) => {
    if (!moveOneType || !moveOneValue || !moveTwoType || !moveTwoValue ||
        !moveThreeType || !moveThreeValue) {
        return;
    }
      
    if (!isValidMoveType(moveOneType) ||
        !isValidMoveType(moveTwoType) ||
        !isValidMoveType(moveThreeType)) {
        return;
    }
      
    if (!isValidMoveValue(moveOneValue) ||
        !isValidMoveValue(moveTwoValue) ||
        !isValidMoveValue(moveThreeValue)) {
        return;
    }
      
    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
    }
      
    if (player === "Player One") {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } else if (player === "Player Two") {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
}

const isValidMoveType = (moveType) => {
    return ((moveType === "scissors") || (moveType === "paper") || (moveType === "rock"));
}

const isValidMoveValue = (moveValue) => {
    return (moveValue >= 1) && (moveValue <= 99);
}

const getRoundWinner = (roundNumber) => {
    switch(roundNumber) {
        case 1:
          return roundOne();
        case 2:
          return roundTwo();
        case 3:
          return roundThree();
        default:
          return null;
      }
}

const getMoveWinner = (playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) => {
    if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType ||
        !playerTwoMoveValue) {
        return null;
    }

    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else if (playerOneMoveValue < playerTwoMoveValue) {
            return 'Player Two';
        } else {
            return 'Tie';
        }
    }
    if (playerOneMoveType === 'rock') {
        if (playerTwoMoveType === 'scissors') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper') {
        if (playerTwoMoveType === 'rock') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else {
        if (playerTwoMoveType === 'paper') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    }
}

const roundOne = () => {
    return getMoveWinner(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
}

const roundTwo = () => {
    return getMoveWinner(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
}

const roundThree = () => {
    return getMoveWinner(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
}

const getGameWinner = () => {
    if (!playerOneMoveOneType || !playerOneMoveTwoType ||
        !playerOneMoveThreeType || !playerOneMoveOneValue ||
        !playerOneMoveTwoValue || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveTwoType ||
        !playerTwoMoveThreeType || !playerTwoMoveOneValue ||
        !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
      return null;
    }

    let playerOneWins = 0;
    let playerTwoWins = 0;
    let ties = 0;

    for (i = 1; i < 4; i++) {
        if (getRoundWinner(i) === "Player One") {
            playerOneWins++;
        } 
        if (getRoundWinner(i) === "Player Two") {
            playerTwoWins++;
        }
        if (getRoundWinner(i) === "Tie") {
            ties++;
        } 
    }

    if (playerOneWins > playerTwoWins) {
        return "Player One";
    } else if (playerOneWins < playerTwoWins) {
        return "Player Two";
    } else if (ties === 3) {
        return "Tie";
    } else {
        return "Tie";
    }
}

const setComputerMoves = () => {
    var moveOneValue,
        moveTwoValue,
        moveThreeValue;
    const moveOneType = generateRandomMoveType();
    const moveTwoType = generateRandomMoveType();
    const moveThreeType = generateRandomMoveType();
    moveOneValue = generateAppropriateMoveValue(98);
    if (moveOneValue !== 99) {
        moveTwoValue = generateAppropriateMoveValue(98 - moveOneValue);
        if ((moveOneValue + moveTwoValue) !== 99) {
            moveThreeValue = 99 - (moveOneValue + moveTwoValue);
        } else {
            moveThreeValue = 0;
        }
    } else {
        moveTwoValue = 0;
        moveThreeValue = 0;
    }
    setPlayerMoves("Player Two", moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue);
}

const generateRandomMoveType = () => {
    switch(generateRandomNumber(2)) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
        default:
            return "rock";
    }
}

const generateAppropriateMoveValue = (max) => {
    return generateRandomNumber(max);
}

const generateRandomNumber = (upperLimitMinusOne) => {
    let rand = (Math.random() * upperLimitMinusOne) + 1;
    rand = Math.round(rand);
    return rand;
}