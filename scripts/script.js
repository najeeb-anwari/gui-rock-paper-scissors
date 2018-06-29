var welcome = document.querySelector(".popup");
welcome.querySelector(".welcome span").
addEventListener("click", () => {
	welcome.classList.add("hide");
});
// HELPER FUNCTIONS
	//Random Number 
function randomNumber(max) {
	return (Math.floor(Math.random() * max ));
}
// PLAYER CLASS

class Player {
	constructor(playerName, playerType) {
	    this.name = playerName;
	    this.type = playerType;
	    this.choice = "";
	    this.score = 0;
  	}
}
// INSTANCIATE THE PLAYERS
var user = new Player("User", "user");
var computer = new Player("Computer", "computer");
// AVAILABLE CHOICES
var choices = ["Rock", "Paper", "Scissors"];
var userScoreContainer =
 	document.querySelector(".userScore");
var computerScoreContainer = 
	document.querySelector(".computerScore");
var result = document.querySelector("header div h1");
// REMOVE THE ANIMATIONS
result.addEventListener("animationend", ()=> {
	result.classList.toggle("winAnimate");
});
computerScoreContainer.addEventListener("animationend", ()=> {
	computerScoreContainer.classList.toggle("animate");
});
// GET CHOICES
var images = document.querySelectorAll(".image");
images.forEach( (image) => {
	// REMOVE THE ANIMATE CLASS AFTER ITS FINISHSED
	image.addEventListener("animationend", (e)=>{
		e.target.classList.toggle("animate");
	});
	image.addEventListener("click", (e) =>{
		// START THE ANIMATINO BY CLICKING
		e.target.classList.toggle("animate");
		// GET USER CHOICE
		user.choice = image.getAttribute("alt");
		// GET COMPUTER CHOICE
		computer.choice = choices[randomNumber(choices.length)];
		// FIND THE WINNER
		if ( (user.score >= 5) && (user.score > computer.score) ) {
			result.innerHTML = `<span class="txtRed">You</span> `;
			result.innerHTML += `<span class="txtBlue">Won</span> `;
			result.innerHTML += `<span class="txtGreen">the Game</span>!`;
			result.classList.toggle("gameWinner");
			winnerSound.play();
		} else if ((computer.score >= 5) && (computer.score > user.score)) {
			result.innerHTML = `<span class="txtRed">${computer.name}</span> `;
			result.innerHTML += `<span class="txtBlue">Won</span> `;
			result.innerHTML += `<span class="txtGreen">the Game</span>!`;
			result.classList.toggle("gameWinner");
			loserSound.play();
		} else {
			let winner = findWinner(user, computer);
			if (winner[0] == user.name) {
				++user.score;
				result.innerHTML = `<span class="txtRed">You</span> `;
				result.innerHTML += `<span class="txtBlue">Beat</span> `;
				result.innerHTML += `<span class="txtGreen">${computer.name} by `;
				result.innerHTML += `${winner[1] + " " + winner[2]}</span>!`;
				result.classList.toggle("winAnimate");
				userScoreContainer.innerHTML = user.score;
				winSounds[randomNumber(winSounds.length)].play();
			} else if(winner[0] == computer.name){
				++computer.score;
				result.innerHTML = `<span class="txtRed">${computer.name}</span> `;
				result.innerHTML += `<span class="txtBlue">Beats</span> `;
				result.innerHTML += `<span class="txtGreen">You by `;
				result.innerHTML += `${winner[1] + " " + winner[2]}</span>!`;
				result.classList.toggle("winAnimate");
				computerScoreContainer.innerHTML = computer.score;
				loseSounds[randomNumber(loseSounds.length)].play();
			} else {
				result.innerHTML = `<span class="txtRed">${winner}</span> `;
				result.innerHTML += `<span class="txtBlue">Beats</span> `;
				result.innerHTML += `<span class="txtGreen">${winner}</span>!`;
				result.classList.toggle("winAnimate");
				tieSounds[randomNumber(tieSounds.length)].play();
			}
		}
	});
});
// FIND THE WINNER
function findWinner(player1, player2) {
	if (player1.choice == player2.choice) {
		return "No One";
	}
	else if (
				((player1.choice == "Rock") && ( player2.choice == "Scissors")) ||
				((player1.choice == "Paper") && ( player2.choice == "Rock")) ||
				((player1.choice == "Scissors") && ( player2.choice == "Paper"))
			) {
		return [player1.name, player1.choice, player2.choice];
		// ARRAY INDEX - NAME, WINNER CHOICE, LOSER CHOICE
	}
	else {
		return [player2.name,player2.choice, player1.choice];
	}
}

// SOUND EFFECTS
	// SOUND EFFECTS FOR WINNER
var winSounds = [
					new Audio('sounds/win/airhorn.mp3'),
					new Audio('sounds/win/tada.mp3'),
					new Audio('sounds/win/giterdone.mp3')
];
var winnerSound = new Audio('sounds/win/Applause.mp3');
	// SOUND EFFECTS FOR LOSER
var loseSounds = [
					new Audio('sounds/lose/kidlaugh.mp3'),
					new Audio('sounds/lose/laugh-2.mp3'),
					new Audio('sounds/lose/wrongbuzzer.mp3')
];	
var loserSound = new Audio('sounds/lose/laugh-nono.mp3');
	// TIE SOUNDS
var tieSounds = [
					new Audio('sounds/tie/uhf-scream.mp3'),
					new Audio('sounds/tie/hhhello.mp3')
];

// RESET BUTTON
function reset() {
	result.innerHTML = `<span class="txtRed">Rock</span>, `;
	result.innerHTML += `<span class="txtBlue">Paper</span>, `;
	result.innerHTML += `<span class="txtGreen">Scissors<span>!`;
	user.score = 0;
	computer.score = 0;
	computerScoreContainer.innerHTML = computer.score;
	userScoreContainer.innerHTML = user.score;
	result.classList.remove("gameWinner");
}
