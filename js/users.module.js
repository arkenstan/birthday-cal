import { globalData } from './constants.js';

/**
 *
 * Function calculates a unique initial for the name
 *
 * @param {string} userName
 * @param {Array[string]} initials
 *
 * @returns {string}
 *
 *
 */

const processInitials = (userName, initials) => {
  let nameSplitted = userName.split(' ');
  let spaceRemoved = userName.replace(' ', '');
  let inital = '';
  if (nameSplitted.length > 1) {
    inital = `${nameSplitted[0][0]}${nameSplitted[nameSplitted.length - 1][0]}`;
  } else {
    inital = `${spaceRemoved.charAt(0)}${spaceRemoved.charAt(1)}`;
  }
  let i = 1;
  while (initials.includes(inital) && i <= spaceRemoved.length) {
    inital = `${spaceRemoved.charAt(0)}${spaceRemoved.charAt(i)}`;
  }
  return inital.toUpperCase();
};

/**
 *
 * Function sets dob to year provided and
 * calculates age in unix time
 *
 * @param {string|Date} dob
 * @param {number} year
 *
 * @returns {Object} with dob, dob set to input year,
 * age as time difference and index of day in week
 *
 */

const processDate = (dob, year) => {
  let actualDob = new Date(dob);
  let currentDob = new Date(dob);
  currentDob.setFullYear(year);
  const dayOfWeek = currentDob.getDay();
  const age = currentDob.getTime() - actualDob.getTime();
  return { dob, currentDob, age, dayOfWeek };
};

/**
 *
 * Function defines valid users (i.e. users that have
 * dob less than input year) then sort the valid users
 * according to age(time difference). Also adds day of week
 * string from global constants
 *
 * @param {Array} users
 * @param {string} users[$].name
 * @param {string} users[$].birthday
 * @param {number} year
 *
 * @returns {Array} array of all processed users
 *
 *
 */
const processUserInput = (users, year) => {
  let initialsArray = [];
  const { days } = globalData;
  let processedUsers = [];
  for (let user of users) {
    const { name, birthday } = user;
    let temp = {
      ...user,
      currentDob: null,
      initials: null,
      ageTime: null,
      dayOfWeek: null,
    };
    let { currentDob, age, dayOfWeek } = processDate(birthday, year);
    if (age >= 0) {
      const initials = processInitials(name, initialsArray);
      initialsArray.push(initials);
      temp = {
        ...temp,
        initials,
        currentDob,
        ageTime: age,
        dayOfWeek: days[dayOfWeek],
      };
      processedUsers.push(temp);
    }
  }
  processedUsers = processedUsers.sort((el1, el2) => {
    return el1.ageTime - el2.ageTime;
  });
  return processedUsers;
};

export { processUserInput };
