const validations = {
  validateJsonEnities: (birthdayInputs) => {
    if (!Array.isArray(birthdayInputs)) {
      throw new Error('Birthday should be an array');
    }
    let validatedData = [];
    let nameRegexp = /^[\w\s]*$/i;
    for (let birthdayInput of birthdayInputs) {
      let temp = { name: null, birthday: null };
      let { name, birthday } = birthdayInput;
      name = name.toString().trim();
      const isName = nameRegexp.test(name);
      // Test name
      if (!isName) {
        throw new Error(
          `Invalid name ${name}. Name should only container alphabets and space`
        );
      } else {
        temp.name = name;
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
      throw new Error('Invalid Year Input');
    } else if (val <= 1900) {
      throw new Error('Entered Year should be greater than 1900');
    }
    return hasError;
  },
};

function validateInputs(formInputs) {
  let birthdayInput = formInputs['birthdayList'].value;
  let yearInput = +formInputs['year'].value;
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
  try {
    validations.isCorrectYear(yearInput);
    formData = { ...formData, year: yearInput };
  } catch (error) {
    formData.errors.push(error.message);
  }

  return formData;
}

export { validateInputs };
