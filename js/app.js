import { processUserInput } from './users.module.js';
import {
  createCalCards,
  addUsersToCards,
  showErrors,
} from './layout.module.js';
import { validateInputs } from './validations.js';

/**
 *
 * Function to initialize event listeners for form events
 *
 */
const initializeForms = () => {
  // Get Birthday Form
  let inputForm = document.forms['birthdayForm'];

  // Submit event listener for birthday form
  inputForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    // Validating Inputs
    let formData = validateInputs(inputForm);
    if (formData.errors.length > 0) {
      // Handling for errors
      showErrors(formData.errors);
    } else {
      // Draw users in cal cards
      const { birthdays, year } = formData;
      let users = processUserInput(birthdays, year);
      addUsersToCards(users);
    }
  });
};

/**
 *
 * Function is invoked on window load to perform initialization
 * of calender cards and form events
 *
 */
const initialize = () => {
  createCalCards();
  initializeForms();
};

window.onload = initialize;
