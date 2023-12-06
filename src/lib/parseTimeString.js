//convert date time to XX:XX AM/PM
const parseTimeString = (date) => {
  let hours = date.getHours();
  let hoursString = (hours > 12 ? hours - 12 : hours).toString();
  return `${hoursString}:${("0" + date.getMinutes()).slice(-2)}${
    hours >= 12 ? "PM" : "AM"
  }`;
};

export default parseTimeString;
