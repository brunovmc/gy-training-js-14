const { parseDateTime } = require('../utils/dateConversor');

function calculateWeeklyAggregation() {
  const weeklyData = {};
  let currentWeekStart = null; 

  function onData(row) {
    const alarmThreshold = 1;

    const date = parseDateTime(row.dateTime);

    if (currentWeekStart === null) {
      currentWeekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    const nextWeekStart = new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (date >= nextWeekStart) {
      currentWeekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    const isoDateString = currentWeekStart.toISOString().split('T')[0];
    const value = Number(row.value.replace(',', '.'));

    if (!isNaN(value)) {
      if (!weeklyData[isoDateString]) {
        weeklyData[isoDateString] = { sum: 0, count: 0, alarmCount: 0 };
      }

      weeklyData[isoDateString].sum += value;
      weeklyData[isoDateString].count++;

      if (value > alarmThreshold) {
        weeklyData[isoDateString].alarmCount++;
      }
    }
  }

  function onEnd() {
    console.log("Weekly Aggregation Report:");
    for (const weekStartDate in weeklyData) {
      const { sum, count, alarmCount } = weeklyData[weekStartDate];
      const weeklyAverage = sum / count;
      console.log(`${weekStartDate} - Weekly Average: ${weeklyAverage.toFixed(2)} - Alarms Triggered: ${alarmCount}`);
    }
  }

  return { onData, onEnd };
}

module.exports = {
  calculateWeeklyAggregation
};
