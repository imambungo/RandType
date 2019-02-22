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

let wrongChars = [];

// Get the first random char
// Source: https://stackoverflow.com/a/4842622/9157799
window.onload = changeChar;

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
		correctKeystrokes.innerText = `${correctKeystrokesValue}`;

		// Increment combo
		comboValue++;

		if (comboValue > 1)
			combo.innerText = `Combo : ${comboValue}`;
		else
			// set combo.innerText to a non-breaking space
			// Source: https://stackoverflow.com/a/5238020/9157799
			combo.innerText = '\xa0';

		if (comboValue > highestComboValue)
		{
			highestComboValue = comboValue;
			highestCombo.innerText = `${highestComboValue}`;
		}

		// Reset wrong characters
		wrongChars = [];
	}
	else// If the typed character doesn't match the random char
	{
		// Unshift the wrong character to wrongChars array
		unshiftWrongChars(e.charCode);

		// Update wrong characters
		updateWrongChars();

		// Increment wrong keystrokes
		wrongKeystrokesValue++;
		wrongKeystrokes.innerText = `${wrongKeystrokesValue}`;

		// Reset combo
		comboValue = 0;

		if (wrongChars.length == 5)
			combo.innerText = 'Type the char below';
		else
			// set combo.innerText to a non-breaking space
			combo.innerText = '\xa0';
	}

	updateAccuracy();
});

function changeChar() {
	document.getElementById("randomChar").innerHTML = getRandomChar();
}

function getRandomChar()
{
	randomCharCode = getRandomIntInclusive(32,126);// See: http://rmhh.co.uk/ascii.html
	// TODO: include ↵ (enter), ⇆ (tab), ⌫  (backspace)

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
	totalKeystrokes = correctKeystrokesValue + wrongKeystrokesValue;
	accuracyValue = 100 * correctKeystrokesValue / totalKeystrokes;
	accuracy.innerText = `${accuracyValue.toFixed(1)}`;
}

function unshiftWrongChars(charCode)
{
	if (charCode == 32)
		wrongChars.unshift('⎵');
	else if (charCode == 13)
		wrongChars.unshift('↵');
	else
		wrongChars.unshift( `${String.fromCharCode(charCode)}` );

	// Limit the length of the chars to 5
	if (wrongChars.length > 5)
		wrongChars.pop();
}

function updateWrongChars()
{
	var wrongCharsString = "";

	for (var i = 0; i < wrongChars.length; i++)
	{
		wrongCharsString += wrongChars[i];

		// Separate the chars with spaces
		if (i < wrongChars.length - 1)
			wrongCharsString += ' ';
	}

	log.innerText = wrongCharsString;
}
