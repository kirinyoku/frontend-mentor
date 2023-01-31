const letterPattern = /^[A-Za-z][A-Za-z0-9]*$/;

let currentGuessCount = 1;
let currentLetters = document.querySelector('#guess' + currentGuessCount);

document.addEventListener('keydown', (e) => {
	if (e.key.length === 1 && letterPattern.test(e.key)) {
		console.log('true');
	} else {
		console.log('false')
	}
});
