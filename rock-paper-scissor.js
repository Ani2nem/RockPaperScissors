let score = JSON.parse(localStorage.getItem
    ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();


function playgame(playerMove){
    computerMove = pickComputerMove();

    if (playerMove === 'scissors'){
        if(computerMove === 'rock'){
        result = 'you lose.';
     }
     else if (computerMove === 'paper'){
        result = 'you win!';
     }else{
        result = 'tie';
     }
    }

    if (playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'you win!';
        }
        else if (computerMove === 'paper'){
            result = 'tie';
        }else{
            result = 'you lose.';
        }
    }

    if (playerMove == 'rock'){
        if(computerMove === 'rock'){
            result = 'tie';
        }
        else if (computerMove === 'paper'){
            result = 'you lose.';
        }else{
            result = 'you win!';
        }
    }

    if(result === 'you win!'){
        score.wins++;
    }else if (result === 'you lose.'){
        score.losses++;
    }else{
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}.png" class="move-icon"> <img src="images/${computerMove}.png" class="move-icon"> Computer`;
}

function pickComputerMove(){
    computerMove = '';
    randomNumber = Math.random(); // will generate a number between 0 and 1
    result = '';
    if(randomNumber >= 0 && randomNumber < 1 / 3){
        computerMove = 'rock';
    }else if (randomNumber >= 1/3 && randomNumber <  2/3) {
        computerMove = 'paper';
    }else{
        computerMove = 'scissors';
    }
    return computerMove;
}

function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalID; 

function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(function() {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }else{
        clearInterval(intervalID);
        isAutoPlaying = false;
    }

}

document.querySelector('.js-rock-button')
    .addEventListener('click', () =>{
     playgame('rock');
 });

document.querySelector('.js-paper-button')
    .addEventListener('click', () =>{
    playgame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () =>{
    playgame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r' || event.key === 'R' ){
        playgame('rock');
    } else if(event.key === 'p' || event.key === 'P'){
        playgame('paper');
    } else if(event.key === 's' || event.key === 'S'){
        playgame('scissors');
    }
});


