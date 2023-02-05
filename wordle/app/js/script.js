// guess counter
let currentGuessCount = 1;
// tile counter
let tileNumber = 0;
// current row of guess
let currentGuess = document.querySelector(`#guess${currentGuessCount}`);
// array of tiles in the current row of guess
let guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);
// array of keyboard keys
const keyboardKeys = document.querySelectorAll('.keyboard__key');
// element for display result
const result = document.querySelector('.result__info');
// header navigation buttons
const helpButton = document.querySelector('#help-button');
const refreshButton = document.querySelector('#refresh-button');
// help menu 
const helpMenu = document.querySelector('#help');
const helpMenuClose = document.querySelector('.modal__close > img');
// controller for event listener 
const controller = new AbortController();
const { signal } = controller;
// regular expression to test a string for a letter
const letterPattern = /^[A-Za-z][A-Za-z0-9]*$/;

// list of words for guess
let words = [];

const guessWord = (data) => {
	const randomItem = Math.floor(Math.random() * (data.length - 1)) + 1;
	localStorage.setItem('solution', data[randomItem]);
}

const getSolution = () => {
	fetch('../words.json')
	.then(function(res) {
		return res.json();
	})
	.then(function(data) {
		guessWord(data);
	})
}

const getWords = () => {
	fetch('../words.json')
	.then(function(res) {
		return res.json();
	})
	.then(function(data) {
		words = data;
	})
} 

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

const getKey = (letter) => {
	return document.querySelector(`.keyboard__key[data-key=${letter}]`);
}

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
		let letter = guessTiles[i].textContent;
		if (letter === localStorage.getItem('solution')[i]) {
			guessTiles[i].dataset.state = 'correct';
			getKey(letter).dataset.state = 'correct';
		} else if (localStorage.getItem('solution').includes(letter)) {
			guessTiles[i].dataset.state = 'present';
			getKey(letter).dataset.state = 'present';
		} else {
			guessTiles[i].dataset.state = 'absent';
			getKey(letter).dataset.state = 'absent';
		};
		addAnimation(guessTiles[i].parentElement, 'flip');
		addAnimation(guessTiles[i], 'idle');
	};
};

const checkGuess = () => {
	if (currentGuess.dataset.guess === localStorage.getItem('solution')) {
		controller.abort();
		localStorage.clear();
		result.textContent = 'You guessed the word! 🥳';
	} else if (currentGuessCount === 6) {
		controller.abort();
		result.textContent = localStorage.getItem('solution');
		localStorage.clear();
	} else {
		tileNumber = 0;
		currentGuessCount += 1;
		currentGuess = document.querySelector(`#guess${currentGuessCount}`);
		guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);
		result.textContent = '';
	};
}

const addGuessToData = () => {
	currentGuess.dataset.guess = currentGuess.dataset.letters;
}

const addGuessToStorage = () => {
	localStorage.setItem('guess', [localStorage.getItem('guess'), currentGuess.dataset.guess]);
}

const submitGuess = () => {
	if (words.includes(currentGuess.dataset.letters)) {
		checkLetters();
		addGuessToData();
		addGuessToStorage();
		checkGuess();
	} else {
		addAnimation(currentGuess, 'shake');
		result.textContent = 'isn\'t a word';
		setTimeout(() => {
			addAnimation(currentGuess, 'idle');
			result.textContent = '';
		}, 600)
	}
};

const openHelp = () => {
	helpMenu.style.display = 'flex';
}

const closeHelp = () => {
	helpMenu.style.display = 'none';
}

const refreshGame = () => {
	localStorage.clear();
	location.reload();
}

window.addEventListener("load", () => {
	if (!localStorage.getItem("solution")) {
		getSolution();
	}
	getWords();
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
	refreshButton.addEventListener('click', () => {
		refreshGame();
	})
	helpButton.addEventListener('click', () => {
		openHelp();
	})
	helpMenu.addEventListener('click', (e) => {
		console.log(e.target)
		if (e.target === helpMenu || e.target === helpMenuClose) {
			closeHelp();
		}
	})
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

for (let i = 0; i < keyboardKeys.length; i++) {
	keyboardKeys[i].addEventListener('click', (e) => {
		let dataKey = e.currentTarget.dataset.key;
		if (dataKey.length === 1 && letterPattern.test(dataKey)) {
			typeLetter(dataKey);
		} else if (dataKey === 'Backspace') {
			eraseLetter();
		} else if (dataKey === 'Enter' && tileNumber === 5 && currentGuessCount <= 6) {
			submitGuess();
		};
	});
}
