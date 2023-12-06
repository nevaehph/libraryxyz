//convert time string from XX:XX AM/PM to XX:XX:XX
const parseTime = (timeString) => {
  let timeSplit = timeString.split(":");
  let timeChar = timeString.slice(-2);
  let hour =
    parseInt(timeSplit[0]) +
    (timeChar === "PM" && timeSplit[0] !== "12" ? 12 : 0);
  return `${("0" + hour).slice(-2)}:${timeSplit[1].slice(0, 2)}:00`;
};

export default parseTime;
