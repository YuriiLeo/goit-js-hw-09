const refs = {
 btnStartChangeColor: document.querySelector("[data-start]"),
 btnStopChangeColor: document.querySelector("[data-stop]")
};
const PROMPT_DELAY = 1000;
let btnIsActive = false;
// vuznachennya dovilnogo kolory
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
};

// Povisuv zminy bcg 
  function handleChangeColor() {
    let color = getRandomHexColor();
    console.log(color);
    document.body.setAttribute('style', `background: ${color}`);
};

// Zmina bcg z intervalom
function StartTimerChangeColor() {
  if (btnIsActive) {
    // refs.btnStartChangeColor.removeEventListener("click", StartTimerChangeColor); 
    return;
  }
  timerId = setInterval(handleChangeColor, PROMPT_DELAY);
  btnIsActive = true;
}

// Zupunka zminu
function StopTimerChangeColor () {
  clearInterval(timerId);
  // refs.btnStartChangeColor.addEventListener("click", StartTimerChangeColor);
  btnIsActive = false;
}
 

  
refs.btnStartChangeColor.addEventListener("click", StartTimerChangeColor);
refs.btnStopChangeColor.addEventListener("click", StopTimerChangeColor);

