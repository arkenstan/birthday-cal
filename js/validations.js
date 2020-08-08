const validations = {
  validateJsonEnities: (birthdayInputs) => {
    if (!Array.isArray(birthdayInputs)) {
      throw new Error('Birthday should be an array');
    }
    let validatedData = [];
    let nameRegexp = new RegExp(/[\w\s]*/, 'gi');
    for (let birthdayInput of birthdayInputs) {
      let temp = { name: null, dob: null };
      let { name, birthday } = birthdayInput;
      // Test name
      if (!birthday.name.test(nameRegexp)) {
        throw new Error(
          `Invalid name ${name}. Name should only container alphabets and space`
        );
      } else {
        temp.name = name.trim();
      }

      // Parse Date
      try {
        let dob = new Date(birthday);
        temp.birthday = birthday;
      } catch (error) {
        throw new Error(
          `Invalid Date format (${birthday}). Please provide date in MM/DD/YYYY`
        );
      }
      validatedData.push(temp);
    }
    return validatedData;
  },
  isCorrectYear: (val) => {
    let hasError = false;
    if (!Number.isInteger(val)) {
      hasError = 'Invalid Number';
    } else if (val <= 1900) {
      hasError = 'Entered Year should be greater than 1900';
    }
    return hasError;
  },
};

function validateInputs(formInputs) {
  let birthdayInput = formInputs['birthdayList'].value;
  let yearInput = formInputs['year'].value;
  let formData = { errors: [], birthdays: null, year: null };

  // Validate birthday inputs
  try {
    let birthdays = JSON.parse(birthdayInput);
    birthdays = validations.validateJsonEnities(birthdays);
    formData = { ...formData, birthdays };
  } catch (error) {
    formData.errors.push(error.message);
  }

  // Validate Input Date
  let yearError = validations.isCorrectYear(yearInput);
  if (yearError) {
    formData.errors.push(yearError);
  } else {
    formData = { ...formData, year: yearInput };
  }

  return formData;
}

export { validateInputs };
