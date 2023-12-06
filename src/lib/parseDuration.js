const parseDuration = (timeString) => {
  const time = parseFloat(timeString);
  return time / 60;
};

export default parseDuration;
