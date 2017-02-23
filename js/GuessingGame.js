function generateWinningNumber(){
    return Math.floor(Math.random()*100 + 1);
}

function shuffle(arr){
    var len = arr.length;
    var i;
    var last;

    while(len){
        i = Math.floor(Math.random() * len--);
        last = arr[len];
        arr[len] = arr[i];
        arr[i] = last;
    }
    return arr;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || typeof num !== 'number'){
        throw 'That is an invalid guess.';
    }
    this.playersGuess = num;
    return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    var message = '';
    if(this.playersGuess === this.winningNumber){
        message = 'You Win!';
    }else if(this.pastGuesses.indexOf(this.playersGuess) > -1){
        message = 'You have already guessed that number.';
    }else if(this.pastGuesses.length === 4){
        message = 'You Lose.';
    }else if(this.difference() < 10){
        message = "You're burning up!";    
    }else if(this.difference() < 25){
        message = "You're lukewarm.";    
    }else if(this.difference() < 50){
        message = "You're a bit chilly.";    
    }else if(this.difference() < 100){
        message = "You're ice cold!";    
    }
    this.pastGuesses.push(this.playersGuess);
    return message;
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    var hintArr = [this.winningNumber, generateWinningNumber(),generateWinningNumber()];
    return shuffle(hintArr);
}