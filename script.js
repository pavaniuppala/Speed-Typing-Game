// const startingtime = 5;
// let time = startingtime * 60;
// const countdownelement = document.getElementById("countdown");
// setInterval(updatecountdown, 1000);

// function updatecountdown() {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//   countdownelement.innerHTML = `${minutes} : ${seconds}`;
//   time--;
//   if (minutes === 0 && seconds == 0) {
//     alert("Game over");
//   }
// }
let TIME_LIMIT = 3;
// define quotes to be used
let quotes_array = [
  "Push yourself,because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do."
];

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let qtext = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let qno = 0;
let timer = null;
function updateQuote() {
  qtext.textContent = null;
  current_quote = quotes_array[qno];
  current_quote.split('').forEach(letter => {
    const charspan = document.createElement('span');
    charspan.innerHTML = letter;
    qtext.appendChild(charspan);
  });
  if (qno < quotes_array.length - 1)
    qno++;
  else
    qno = 0;
}

function processCurrentText() {
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');
  characterTyped++;

  errors = 0;

  quoteSpanArray = qtext.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
      errors++;
    }
  });
  error_text.textContent = total_errors + errors;
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);
  if (curr_input.length == current_quote.length) {
    updateQuote();
    total_errors += errors;
    input_area.value = "";
  }
}

function startGame() {

  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT * 60;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  qtext.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (minutes === 0 && seconds == 0) {
    alert("Game over");
    finishGame();
  }
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    // timer_text.textContent = timeLeft + "s";
    timer_text.innerHTML = `${minutes} : ${seconds}`;
  }
  // else {
  //   // finish the game
  //   finishGame();
  // }
}
function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  qtext.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}