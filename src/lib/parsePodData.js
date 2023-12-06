const parsePodData = (podData) => {
  if (!podData) {
    return "";
  }
  return `Room Color: ${podData.roomColor}\nRoom Size: ${podData.size}\nMax Occupants: ${podData.maxOccupants}`;
};

export default parsePodData;
