function convertToISODate(dateTimeString) {
  const dateString = dateTimeString.split(' ')[0];
  const dateParts = dateString.split('/');
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

function parseDateTime(dateTimeString) {
  const [datePart, timePart] = dateTimeString.split(' ');

  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');
  
  return new Date(year, month - 1, day, hour, minute);
}

module.exports = {
  convertToISODate,
  parseDateTime
};
