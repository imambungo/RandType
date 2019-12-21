// For future resource: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

const input = document.querySelector("body");

const correctKeystrokes = document.querySelector("#correctKeystrokes");
let correctKeystrokesValue = 0;

const wrongKeystrokes = document.querySelector("#wrongKeystrokes");
let wrongKeystrokesValue = 0;

const accuracy = document.querySelector("#accuracy");
let accuracyValue = 0;

const highestCombo = document.querySelector("#highestCombo");
let highestComboValue = 0;

const combo = document.querySelector("#combo");
let comboValue = 0;

let randomCharCode = 32; // first char to type: ⎵ (space bar)

const prevWrongChars = document.querySelector("#prevWrongChars");
const lastWrongChar = document.querySelector("#lastWrongChar");

let wrongChars = [];

// Get the first random char
// Source: https://stackoverflow.com/a/4842622/9157799
window.onload = changeChar;

// always detect keystrokes
// Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode#JavaScript
input.addEventListener("keypress", function(e) {
  // If the typed character match the random char
  if (e.charCode == randomCharCode) {
    changeChar(); // Change the char to a new random char

    // Hide last wrong typed char
    prevWrongChars.innerText = "";
    lastWrongChar.innerText = "";

    // Increment correct keystrokes
    correctKeystrokesValue++;
    correctKeystrokes.innerText = `${correctKeystrokesValue}`;

    // Increment combo
    comboValue++;

    if (comboValue > 1) {
      combo.innerText = `Combo : ${comboValue}`;
    } else {
      // set combo.innerText to a non-breaking space
      // Source: https://stackoverflow.com/a/5238020/9157799
      combo.innerText = "\xa0";
    }

    if (comboValue > highestComboValue) {
      highestComboValue = comboValue;
      highestCombo.innerText = `${highestComboValue}`;
    }

    // Reset wrong characters
    wrongChars = [];
  }
  // If the typed character doesn't match the random char
  else {
    // Push the wrong character to wrongChars array
    pushWrongChars(e.charCode);

    // Update wrong characters
    updateWrongChars();

    // Increment wrong keystrokes
    wrongKeystrokesValue++;
    wrongKeystrokes.innerText = `${wrongKeystrokesValue}`;

    // Reset combo
    comboValue = 0;

    if (wrongChars.length == 5) {
      combo.innerText = "Type the char below";
    } else {
      // set combo.innerText to a non-breaking space
      combo.innerText = "\xa0";
    }
  }

  updateAccuracy();
});

function changeChar() {
  document.getElementById("randomChar").innerHTML = getRandomChar();
}

function getRandomChar() {
  let randomChar;
  randomCharCode = getRandomIntInclusive(32, 126); // See: http://rmhh.co.uk/ascii.html
  // TODO: include ↵ (enter), ⇆ (tab), ⌫  (backspace)

  if (randomCharCode == 32) {
    // (Space bar)
    randomChar = "⎵";
    // Instead of " "
  } else {
    randomChar = String.fromCharCode(randomCharCode);
  }

  return randomChar;
}

// get random integer between two values
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateAccuracy() {
  const totalKeystrokes = correctKeystrokesValue + wrongKeystrokesValue;
  accuracyValue = (100 * correctKeystrokesValue) / totalKeystrokes;
  accuracy.innerText = `${accuracyValue.toFixed(1)}`;
}

function pushWrongChars(charCode) {
  if (charCode == 32) {
    wrongChars.push("⎵");
  } else if (charCode == 13) {
    wrongChars.push("↵");
  } else {
    wrongChars.push(`${String.fromCharCode(charCode)}`);
  }

  // Limit the length of the chars to 5
  if (wrongChars.length > 5) {
    wrongChars.shift();
  }
}

function updateWrongChars() {
  let prevWrongCharsString = "";

  for (let i = 0; i < wrongChars.length - 1; i++) {
    prevWrongCharsString += `${wrongChars[i]} `;
  }

  prevWrongChars.innerText = prevWrongCharsString;
  lastWrongChar.innerText = wrongChars[wrongChars.length - 1];
}
