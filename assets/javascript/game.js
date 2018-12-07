//Global variable declaration
var isWinner = false;
var wins = 0;
var losses = 0;
//create array of words
var wordsArray = ["friends", "seinfeld", "fraiser", "rugrats", "blossom", "roseanne", "er", "martin"];
var letter;
var guessesRemaining = 10;
//empty array to store the under scores for the missing letters.
var answerArray = [];
var randomWord;


//startup function to set game up when start button is clicked or the user confirms to continue playing the game.
function startUp() {
    //reset variables
    isWinner = false;
    document.getElementById("usedLetters").innerHTML = " ";
    answerArray = [];
    guessesRemaining = 10;
    //I could not get the numbers to appear on the same line as the text correctly so they were populated on a different line.
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    //create random number to be used to select random word from the wordsArray.
    var randomNumber = Math.floor(Math.random() * wordsArray.length);
    randomWord = wordsArray[randomNumber];
    //create dashes to represent missing words needing to be guessed.
    for (var i = 0; i < randomWord.length; i++) {
        answerArray[i] = "_";
    }
    //puth them in a string and display on the screen.
    var s = answerArray.join(" ");
    document.getElementById("currentWord").innerHTML = s;
}

/*function used to ask the user if they would like to play again or not after each game is finished.  I created this as an option for the future.
function playAgain() {
    answer = prompt("Do you want to play again? Y for yes, N for no.");
    if (answer === 'y') {
        startUp();
    } else {
        alert("Your total wins are: " + wins + " and your total losses are: " + losses);
    }
}*/

//event listener used to call startup function when the button on the homepage is clicked.  
document.getElementById("startGame").addEventListener("click", function(event) {
    event.preventDefault();
    //button will be disabled once clicked.
    document.getElementById("startGame").disabled = true;
    startUp();
});

//onkeyup function to begin taking user letters and comparing them. 
document.onkeyup = function(event) {
    if (guessesRemaining > 1 && isWinner === false) {
        guessesRemaining--;
        document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
        //here we get the letter that the user typed in the box.
        letter = event.key;

        for (var i = 0; i < randomWord.length; i++) {
            //now, if the randomword contains a letter that the user typed in
            if (randomWord[i] === letter.toLowerCase()) {
                //assining it to the letter and displaying it on the screen.
                answerArray[i] = letter;
                document.getElementById("currentWord").innerHTML = answerArray.join(" ");
            }
        }
        //here we will check if the answerArray contains any underscores, if so then the user will continue to guess, if not then the user has guessed to word correctly.
        if (answerArray.includes("_")) {
            isWinner = false;
            //take the guessed letters and put them on the screen for the user to see what they have already guessed.
            text = document.createTextNode(" " + letter.toUpperCase());
            document.getElementById("usedLetters").appendChild(text);
        } else {
            //the user has guessed all letters and has won.  wins will be increased and the startup function will be called to start a new game.
            isWinner = true;
            wins++;
            alert("You are the winner");

            startUp();
        }
    } else {
        //The user has run out of guesses and has not gotten the word correct, the game will now end and the startup function will be called.
        //Here I attempted to put the word that was to be guess on the screen for the user to see, but it would not display before the alert box appeared.
        document.getElementById("currentWord").innerHTML = randomWord;
        losses++;
        //I could not get the word to display on the screen before the alert box displayed, so I wanted a way for the user to see what the word was.  
        alert("You are the loser.  The correct word was: " + randomWord);
        startUp();
    }
}