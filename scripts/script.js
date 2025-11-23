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
var userChoiceDisplay = document.querySelector(".user-choice-display");
var computerChoiceDisplay = document.querySelector(".computer-choice-display");

// REMOVE THE ANIMATIONS
result.addEventListener("animationend", ()=> {
	result.classList.toggle("winAnimate");
});
computerScoreContainer.addEventListener("animationend", ()=> {
	computerScoreContainer.classList.toggle("animate");
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
	const key = e.key.toLowerCase();
	const image = document.querySelector(`.image[data-key="${key}"]`);
	if (image) {
		image.click();
	}
});

// GET CHOICES
var images = document.querySelectorAll(".image");
images.forEach( (image) => {
	// REMOVE THE ANIMATE CLASS AFTER ITS FINISHSED
	image.addEventListener("animationend", (e)=>{
		e.target.classList.toggle("animate");
	});
	image.addEventListener("click", (e) =>{
		// Check if game is over
		if (user.score >= 5 || computer.score >= 5) {
			reset();
			return;
		}

		// START THE ANIMATINO BY CLICKING
		e.target.classList.toggle("animate");

		// REMOVE SELECTED CLASS FROM ALL IMAGES
		images.forEach(img => img.classList.remove("selected"));
		// ADD SELECTED CLASS TO CLICKED IMAGE
		e.target.classList.add("selected");

		// GET USER CHOICE
		user.choice = image.getAttribute("alt");
		// UPDATE USER DISPLAY
		userChoiceDisplay.src = image.src;
		userChoiceDisplay.classList.remove("placeholder");

		// GET COMPUTER CHOICE
		computer.choice = choices[randomNumber(choices.length)];
		// UPDATE COMPUTER DISPLAY
		updateComputerDisplay(computer.choice);

		// FIND THE WINNER AND UPDATE SCORE
		let winner = findWinner(user, computer);
		if (winner[0] == user.name) {
			++user.score;
			result.innerHTML = `<span class="txtRed">You</span> `;
			result.innerHTML += `<span class="txtBlue">Beat</span> `;
			result.innerHTML += `<span class="txtGreen">${computer.name} by `;
			result.innerHTML += `${winner[1] + " " + winner[2]}</span>!`;
			result.classList.toggle("winAnimate");
			userScoreContainer.innerHTML = user.score;
			playSound(winSounds[randomNumber(winSounds.length)]);
		} else if(winner[0] == computer.name){
			++computer.score;
			result.innerHTML = `<span class="txtRed">${computer.name}</span> `;
			result.innerHTML += `<span class="txtBlue">Beats</span> `;
			result.innerHTML += `<span class="txtGreen">You by `;
			result.innerHTML += `${winner[1] + " " + winner[2]}</span>!`;
			result.classList.toggle("winAnimate");
			computerScoreContainer.innerHTML = computer.score;
			playSound(loseSounds[randomNumber(loseSounds.length)]);
		} else {
			result.innerHTML = `<span class="txtRed">${winner}</span> `;
			result.innerHTML += `<span class="txtBlue">Beats</span> `;
			result.innerHTML += `<span class="txtGreen">${winner}</span>!`;
			result.classList.toggle("winAnimate");
			playSound(tieSounds[randomNumber(tieSounds.length)]);
		}

		// CHECK FOR GAME OVER AFTER UPDATING SCORE
		if (user.score >= 5) {
			result.innerHTML = `<span class="txtRed">You</span> `;
			result.innerHTML += `<span class="txtBlue">Won</span> `;
			result.innerHTML += `<span class="txtGreen">the Game</span>!`;
			result.classList.toggle("gameWinner");
			playSound(winnerSound);
			showGameOver("You Won!");
		} else if (computer.score >= 5) {
			result.innerHTML = `<span class="txtRed">${computer.name}</span> `;
			result.innerHTML += `<span class="txtBlue">Won</span> `;
			result.innerHTML += `<span class="txtGreen">the Game</span>!`;
			result.classList.toggle("gameWinner");
			playSound(loserSound);
			showGameOver("Computer Won!");
		}
	});
});

function updateComputerDisplay(choice) {
	// Dynamically find the image src from the DOM based on the choice (alt text)
	const sourceImage = document.querySelector(`.image[alt="${choice}"]`);
	if (sourceImage) {
		computerChoiceDisplay.src = sourceImage.src;
		computerChoiceDisplay.classList.remove("placeholder");
	}
}

function showGameOver(message) {
	// Re-use the existing popup or create a simple alert for now
	// Ideally we could modify the DOM to show a "Play Again" modal
	setTimeout(() => {
		alert(message + " Click Reset or OK to play again.");
		reset();
	}, 500);
}
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
// Helper to safely play audio
function playSound(audio) {
	if (audio) {
		audio.currentTime = 0; // Reset to start
		audio.play().catch(e => console.log("Audio play failed:", e));
	}
}

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

	// Reset visuals
	userChoiceDisplay.src = "images/logo.svg";
	userChoiceDisplay.classList.add("placeholder");
	computerChoiceDisplay.src = "images/logo.svg";
	computerChoiceDisplay.classList.add("placeholder");
	images.forEach(img => img.classList.remove("selected"));
}
