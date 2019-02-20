let input = document.querySelector('body');
let log = document.querySelector('#log');
let randomCharCode = 32;

// always detect keystrokes
input.addEventListener('keypress', function(e) {


	// if the typed character match the random char, change the random char
	if (e.charCode == randomCharCode)
	{
		changeChar();
		log.innerText = '';
	}
	else
	{
		// show typed character
		if (e.charCode == 32)
			log.innerText = `⎵`;
		else if (e.charCode == 13)
			log.innerText = '↵';
		else
			log.innerText = `${String.fromCharCode(e.charCode)}`;
	}

});
// Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode#JavaScript

function changeChar() {
	document.getElementById("randomChar").innerHTML = getRandomChar();
}

function getRandomChar() {
	randomCharCode = getRandomIntInclusive(32,126);

	if (randomCharCode == 32)
		randomChar = "⎵";
	else
		randomChar = String.fromCharCode(randomCharCode);

	return randomChar;
}

// get random integer between two values
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
