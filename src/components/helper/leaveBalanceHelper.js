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
