/**
 *
 * @param {object} userInput
 * @param {string} userInput.name
 * @param {string} userInput.birthday
 * @param {string} inputYear
 *
 * @returns {object}
 */

function createUser(userInput, inputYear) {
  const { name, birthday } = userInput;
  let userDetails = {
    name,
    dob: birthday,
    initials: null,
    birthDay: null,
    age: null,
    isValid: true,
  };

  // Create Date details
  const dob = new Date(birthday);
  const dobCurrentYear = new Date(birthday);
  dobCurrentYear.setFullYear(inputYear);
  userDetails.age = dobCurrentYear.getTime() - dob.getTime();

  if (userDetails.age < 0) {
    userDetails.isValid = false;
  }

  if (userDetails.isValid) {
    // Get Day of birth in current year
    userDetails.birthDay = dobCurrentYear.getDay();

    // Create Initials Details
    const nameSplit = name.split(' ');
    userDetails.initials = nameSplit.reduce((acc, curr) => {
      acc += curr[0];
      return acc;
    }, '');
  }

  return userDetails;
}

function postProcessUsers(users) {
  users = users.filter((el) => el.isValid);
  users = users.sort((el1, el2) => {
    return el1.age - el2.age;
  });
  return users;
}

export { createUser, postProcessUsers };
