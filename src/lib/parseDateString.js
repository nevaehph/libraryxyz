import parseMonth from "./parseMonth";

const parseDateString = (date) => {
  return `${date.getDate()} ${parseMonth(
    date.getMonth()
  )} ${date.getFullYear()}`;
};

export default parseDateString;
