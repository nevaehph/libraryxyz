const parseMonth = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

const parseDateString = (date) => {
  return `${date.getUTCDate()} ${parseMonth(
    date.getUTCMonth()
  )} ${date.getUTCFullYear()}`;
};

export default parseDateString;
