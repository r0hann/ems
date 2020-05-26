import moment from 'moment';

export const getFullname = userDetail => {
  let fullname = '';

  if (userDetail) {
    const { fname, mname, lname } = userDetail;
    fullname = fname && lname ? [fname, mname, lname].filter(x => x !== '').join(' ') : '';
  } // if (salutation) fullname = salutation + '.' + fullname;
  return fullname;
};

export function addFullName(leaveBalances, fullName) {
  return leaveBalances.length > 0
    ? leaveBalances.map(obj => {
        return {
          ...obj,
          fullname: fullName ? fullName : ''
        };
      })
    : [];
}

export const getValueArray = (objectArray, variableName) => {
  let userList = [];
  if (objectArray.length > 0) {
    objectArray.forEach(option => {
      userList.push(option[variableName]);
    });
  }
  return userList;
};

export const calculateDays = (dateFrom, dateTo) => {
  const startDate = moment(dateFrom);
  const endDate = moment(dateTo);
  const days = endDate.diff(startDate, 'days') + 1;
  return days;
};
