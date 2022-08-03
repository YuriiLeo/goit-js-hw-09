import Notiflix from 'notiflix';


const refs = {
    formEl: document.querySelector(".form"),
    delayEl: document.querySelector("[name=delay]"),
    stepEl: document.querySelector("[name=step]"),
    amountEl: document.querySelector("[name=amount]"),
}

refs.formEl.addEventListener("submit",onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    
    let amount =  Number(refs.amountEl.value);
    let delay = Number(refs.delayEl.value);
    let step = Number(refs.stepEl.value);
    
    for (let i = 1; i <= amount; i += 1) {
        let position = i;
        createPromise(position, delay)
  .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      return;
  })  
  .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      return;
  })
        delay += step;
    }

    event.currentTarget.reset();
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({position, delay});
            } 
                reject({position, delay});
        }, delay);
    });
};



