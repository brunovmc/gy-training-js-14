const { convertToISODate } = require('../utils/dateConversor');

function calculateDailyAggregation() {
  const dailyAggregation = {};

  function onData(row) {
    const isoDateString = convertToISODate(row.dateTime);
    const value = Number(row.value.replace(',', '.'));

    if (!isNaN(value)) {
      if (dailyAggregation[isoDateString]) {
        dailyAggregation[isoDateString].sum += value;
        dailyAggregation[isoDateString].count++;
      } else {
        dailyAggregation[isoDateString] = { sum: value, count: 1 };
      }
    }
  }

  function onEnd() {
    console.log("Daily Aggregation:");
    for (const date in dailyAggregation) {
      dailyAggregation[date].average = dailyAggregation[date].sum / dailyAggregation[date].count;
      console.log(`${date} - Average Value: ${dailyAggregation[date].average.toFixed(2)}`);
    }
  }

  return { onData, onEnd };
}

module.exports = {
  calculateDailyAggregation
};
