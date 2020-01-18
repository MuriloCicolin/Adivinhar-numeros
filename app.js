/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1;
    max = 10;
    winningNum = getRandoNum(min,max);
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game');
      minNum = document.querySelector('.min-num');
      maxNum = document.querySelector('.max-num');
      guessBtn = document.querySelector('#guess-btn');
      guessInput = document.querySelector('#guess-input');
      message = document.querySelector('.message');

//Play again event listener
game.addEventListener('mousedown', (event) => {
    if(event.target.className === 'play-again') {
        window.location.reload();
    }
})

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', btnSumit);

function btnSumit() {
    let guess = parseInt(guessInput.value);
    
    if( isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if Won
    if(guess === winningNum){ // Game over - Won
        gameOver(true, `You win!! The correct number is ${winningNum}`)
    } else {
        guessLeft -= 1;
        
        if(guessLeft === 0 || guessLeft < 0) {
            gameOver(false, `Game over! The correct number is ${winningNum}`)
        } else {
            // Game continues - answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guessLeft} is not correct, ${guessLeft} guesses`, 'red');
            
        }
    }
        
 }

// Function game over

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    //Play again ?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}


// Function setMessage
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandoNum(min,max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}