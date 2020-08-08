/**
 *
 * Check if a value provided fits basic requirements
 *
 * @param {string} key name of the field
 * @param {string} val value of the field
 *
 * @throws {Error} Error when invalid condition is met
 *
 */
const isRequired = (key, val) => {
  let invalids = [undefined, null, ''];
  if (invalids.includes(val)) {
    throw new Error(`${key} is required`);
  }
};
/**
 *
 * Function validate year input to be valid
 *
 * @param {*} val
 *
 * @throws {Error} NaN
 * @throws {Error} Error for Input year < 1900
 *
 *
 */
const isCorrectYear = (val) => {
  if (!Number.isInteger(val)) {
    throw new Error('Invalid Year Input');
  } else if (val <= 1900) {
    throw new Error('Entered Year should be greater than 1900');
  }
};

/**
 *
 * Function validates for JSON entities to be an array
 * also validates array objects for correct name and
 * date format
 *
 * @param {*} birthdayInputs
 *
 * @returns {Object}
 *
 */
const validateJsonEnities = (birthdayInputs) => {
  if (!Array.isArray(birthdayInputs)) {
    throw new Error('Birthday should be an array');
  }
  let validatedData = [];
  let nameRegexp = new RegExp(/^[\w\s]*$/, 'i');
  let dateRegexp = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
  for (let birthdayInput of birthdayInputs) {
    let temp = { name: null, birthday: null };
    let { name, birthday } = birthdayInput;
    isRequired('Name', name);
    isRequired('Birthday', birthday);
    name = name.toString().trim();
    const isName = nameRegexp.test(name);
    const isValidDate = dateRegexp.test(birthday);

    // Name Validations
    if (!isName) {
      throw new Error(
        `Invalid name ${name}. Name should only container alphabets and space`
      );
    } else {
      temp.name = name;
    }

    // Date Validations
    const dateErrorMsg = `Invalid Date format (${birthday}). Please provide date in MM/DD/YYYY`;
    if (!isValidDate) {
      throw new Error(dateErrorMsg);
    }
    try {
      new Date(birthday);
      temp.birthday = birthday;
    } catch (error) {
      throw new Error(dateErrorMsg);
    }
    validatedData.push(temp);
  }
  return validatedData;
};

const validations = {
  validateJsonEnities,
  isCorrectYear,
  isRequired,
};

/**
 *
 * Function validates form input for birthday list provided
 * and year provided
 *
 * @param {*} formInputs
 * @returns {object}
 *
 */
const validateInputs = (formInputs) => {
  try {
    let birthdayInput = formInputs['birthdayList'].value;
    let yearInput = formInputs['year'].value;

    // TODO: Optimize later for array of fields
    isRequired('birthdays', birthdayInput);
    isRequired('Year', yearInput);

    yearInput = +yearInput;
    var formData = { errors: [], birthdays: null, year: null };

    // Validate birthday inputs
    let birthdays = JSON.parse(birthdayInput);
    birthdays = validations.validateJsonEnities(birthdays);
    formData = { ...formData, birthdays };

    // Validate Input Date
    validations.isCorrectYear(yearInput);
    formData = { ...formData, year: yearInput };
  } catch (error) {
    if (error.name && error.name === 'SyntaxError') {
      formData.errors.push('Invalid JSON syntax');
    } else {
      formData.errors.push(error.message);
    }
  }

  return formData;
};

export { validateInputs };
