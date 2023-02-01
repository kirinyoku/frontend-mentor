// guess counter
let currentGuessCount = 1;
// tile counter
let currentTileNumber = 0;
// current row of guess
let currentGuess = document.querySelector(`#guess${currentGuessCount}`);
// array of tiles in the current row of guess
let guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);

// regular expression to test a string for a letter
const letterPattern = /^[A-Za-z][A-Za-z0-9]*$/;

// adding animation-delay to the tile wrappers (to animate the flipping of tiles)
for (let i = 1; i <= 6; i++) {
	let delay = 0;
	const tileWrapperList = document.querySelectorAll(`#guess${i} > div`);
	for (let j = 0; j < tileWrapperList.length; j++){
		tileWrapperList[j].style.animationDelay = `${delay}ms`;
		delay += 100;
	}
}


document.addEventListener('keydown', (e) => {
	// checking if the key is a letter
	if (e.key.length === 1 && letterPattern.test(e.key)) {
		if (currentTileNumber <= 4) {
			// typing a letter in the current tile
			guessTiles[currentTileNumber].innerHTML = e.key.toLocaleLowerCase();
			// adding pop animation to the tile
			guessTiles[currentTileNumber].dataset.animation = 'pop';
			// adding a letter in the data-letters
			currentGuess.dataset.letters += e.key.toLocaleLowerCase();
			// increase tile counter
			currentTileNumber += 1;
		}
		// erase the letter after pressing Backspace
	} else if (e.key === 'Backspace') {
		if (currentTileNumber > 0) {
			// decrease tile counter
			currentTileNumber -= 1;
			// remove letter from current tile
			guessTiles[currentTileNumber].innerHTML = '';
			// remove pop animation from the tile
			guessTiles[currentTileNumber].dataset.animation = 'idle';
			// remove letter from data-letters
			currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0, -1);
		}
		// make a guess after pressing Enter
	} else if (e.key === 'Enter' && currentTileNumber === 5 && currentGuessCount < 6) {
		// tile counter reset
		currentTileNumber = 0;
		// increase guess counter  
		currentGuessCount += 1;
		// iteration over guess tiles
		for (let i = 0; i < guessTiles.length; i++) {
			// changing the color of the guess tiles
			guessTiles[i].style.background = 'var(--tile)';
			// adding flip animation to the tiles
			guessTiles[i].parentElement.dataset.animation = 'flip';
		}
		// adding to the data-guess letters from data-letters
		currentGuess.dataset.guess = currentGuess.dataset.letters;
		// go to the next guess row
		currentGuess = document.querySelector(`#guess${currentGuessCount}`);
		// go to the next guess tiles 
		guessTiles = document.querySelectorAll(`#guess${currentGuessCount} .guess__tile`);
	}
});
