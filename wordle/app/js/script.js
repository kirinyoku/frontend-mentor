// guess counter
let currentGuessCount = 1;
// tile counter
let tileNumber = 0;
// current row of guess
let currentGuess = document.querySelector(`#guess${currentGuessCount}`);
// array of tiles in the current row of guess
let guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);
// controller for event listener 
const controller = new AbortController();
const { signal } = controller;
// regular expression to test a string for a letter
const letterPattern = /^[A-Za-z][A-Za-z0-9]*$/;

const words = ['cream'];

// adding animation-delay to the tile wrappers (to animate the flipping of tiles)
const addAnimDelay = () => {
	for (let i = 1; i <= 6; i++) {
		let delay = 0;
		const tileWrapperList = document.querySelectorAll(`#guess${i} > div`);
		for (let j = 0; j < tileWrapperList.length; j++){
			tileWrapperList[j].style.animationDelay = `${delay}ms`;
			delay += 150;
		};
	};
};

const addAnimation = (element, animName) => {
	element.dataset.animation = animName;
};

const typeLetter = (letter) => {
  if (tileNumber <= 4) {
		let currentTile = guessTiles[tileNumber];
    addAnimation(currentTile, 'pop');
    currentTile.textContent = letter;
    currentGuess.dataset.letters += letter;
    tileNumber += 1;
  };
};

const eraseLetter = () => {
	if (tileNumber > 0) {
		tileNumber -= 1;
		let currentTile = guessTiles[tileNumber];
		currentTile.textContent = '';
		currentTile.dataset.animation = 'idle';
		currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0, -1);
	};
};

const checkLetters = () => {
	for (let i = 0; i < guessTiles.length; i++) {
		if (guessTiles[i].textContent === words[0][i]) {
			guessTiles[i].dataset.state = 'correct';
		} else if (words[0].includes(guessTiles[i].textContent)) {
			guessTiles[i].dataset.state = 'present';
		} else {
			guessTiles[i].dataset.state = 'absent';
		};
		addAnimation(guessTiles[i].parentElement, 'flip');
	};
};

const checkGuess = () => {
	if (currentGuess.dataset.guess === words[0] || currentGuessCount === 6) {
		// remove event listener from document
		controller.abort();
		localStorage.clear();
	} else {
		tileNumber = 0;
		currentGuessCount += 1;
		currentGuess = document.querySelector(`#guess${currentGuessCount}`);
		guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);
	};
}

const addGuessToData = () => {
	currentGuess.dataset.guess = currentGuess.dataset.letters;
}

const addGuessToStorage = () => {
	localStorage.setItem('guess', [localStorage.getItem('guess'), currentGuess.dataset.guess]);
}

const submitGuess = () => {
	checkLetters();
	addGuessToData();
	addGuessToStorage();
	checkGuess();
};

window.addEventListener("load", () => {
	addAnimDelay();
	if (localStorage.getItem("guess")?.length > 0) {
		for (let i = 1; i <= localStorage.getItem("guess").split(',').join('').length; i++){
			typeLetter(localStorage.getItem("guess").split(',').join('')[i-1]);
			if (i !== 0 && i % 5 === 0) {
				checkLetters();
				currentGuess.dataset.guess = currentGuess.dataset.letters;
				checkGuess();
			}
		}
	}
});

document.addEventListener('keydown', (e) => {
	if (e.key.length === 1 && letterPattern.test(e.key)) {
		typeLetter(e.key.toLocaleLowerCase());
	} else if (e.key === 'Backspace') {
		eraseLetter();
	} else if (e.key === 'Enter' && tileNumber === 5 && currentGuessCount <= 6) {
		submitGuess();
	};
}, { signal });
