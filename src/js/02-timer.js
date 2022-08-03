// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
 daysEl : document.querySelector("[data-days]"),
 hoursEl : document.querySelector("[data-hours]"),
 minutesEl : document.querySelector("[data-minutes]"),
 secondsEl: document.querySelector("[data-seconds]"),
 btnTimerStart: document.querySelector("[data-start]"),
}
refs.btnTimerStart.setAttribute('disabled', true);

let currentTime = Date.now();
const PROMPT_DELAY = 1000;
let deltaTime = 0;
let chosenByYouDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deltaTime = selectedDates[0] - currentTime;
    if (deltaTime <= 0) {
      return Notify.warning("Please choose a date in the future");
    } else {
      refs.btnTimerStart.removeAttribute('disabled');
      chosenByYouDate = selectedDates[0].getTime();
    }
  }
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function onBtnStartTimer() {
  refs.btnTimerStart.setAttribute('disabled', true);
  setInterval(() => {
   const currentTime = Date.now();
    const deltaTime = chosenByYouDate - currentTime;
    if (deltaTime <= 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);
  }, PROMPT_DELAY);
}

refs.btnTimerStart.addEventListener("click", onBtnStartTimer);

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

