// For future resource: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

let input = document.querySelector('body');

let correctKeystrokes = document.querySelector('#correctKeystrokes');
let correctKeystrokesValue = 0;

let wrongKeystrokes = document.querySelector('#wrongKeystrokes');
let wrongKeystrokesValue = 0;

let accuracy = document.querySelector('#accuracy');
let accuracyValue = 0;

let highestCombo = document.querySelector('#highestCombo');
let highestComboValue = 0;

let combo = document.querySelector('#combo');
let comboValue = 0;

let randomCharCode = 32;// first char to type: ⎵ (space bar)

let log = document.querySelector('#log');

// always detect keystrokes
// Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode#JavaScript
input.addEventListener('keypress', function(e)
{

	// If the typed character match the random char
	if (e.charCode == randomCharCode)
	{
		changeChar();// Change the char to a new random char
		log.innerText = '';// Hide last wrong typed char

		// Increment correct keystrokes
		correctKeystrokesValue++;
		correctKeystrokes.innerText = `Correct keystrokes: ${correctKeystrokesValue}`;

		// Increment combo
		comboValue++;
		combo.innerText = `Combo : ${comboValue}`;
	}
	else// If the typed character doesn't match the random char
	{
		// show typed character
		if (e.charCode == 32)
			log.innerText = `⎵`;
		else if (e.charCode == 13)
			log.innerText = '↵';
		else
			log.innerText = `${String.fromCharCode(e.charCode)}`;

		// Increment wrong keystrokes
		wrongKeystrokesValue++;
		wrongKeystrokes.innerText = `Wrong keystrokes: ${wrongKeystrokesValue}`;

		if (comboValue > highestComboValue)
		{
			highestComboValue = comboValue;
			highestCombo.innerText = `Highest combo: ${highestComboValue}`;
		}

		// Reset combo
		comboValue = 0;
		combo.innerText = 'Combo: 0';
	}

	updateAccuracy();
});

function changeChar() {
	document.getElementById("randomChar").innerHTML = getRandomChar();
}

function getRandomChar()
{
	randomCharCode = getRandomIntInclusive(32,126);// See: http://rmhh.co.uk/ascii.html

	if (randomCharCode == 32)// (Space bar)
		randomChar = "⎵";// Instead of " "
	else
		randomChar = String.fromCharCode(randomCharCode);

	return randomChar;
}

// get random integer between two values
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function updateAccuracy()
{
	totalKeystrokes = correctKeystrokesValue + wrongKeystrokesValue
	accuracyValue = 100 * correctKeystrokesValue / totalKeystrokes
	accuracy.innerText = `Accuracy: ${accuracyValue.toFixed(2)}%`;
}
