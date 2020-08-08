import { sampleInputs } from './helpers.js';
import { processUserInput } from './users.module.js';
import { createCalCards, addUsersToCards } from './layout.module.js';
import { validateInputs } from './validations.js';

function initializeForms() {
  let inputForm = document.forms['birthdayForm'];
  inputForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let formData = validateInputs(inputForm);
    console.log('initializeForms -> formData', formData);
    if (formData.errors.length > 0) {
    } else {
      const { birthdays, year } = formData;
      let users = processUserInput(birthdays, year);
      console.log('initializeForms -> users', users);
    }
  });
}

function initialize() {
  createCalCards();
  initializeForms();
  let users = processUserInput(sampleInputs.users, sampleInputs.yearInput);
  // console.log('initialize -> users', users);
  console.table(users);
  addUsersToCards(users);
}

window.onload = initialize;
