import { Duty } from "../../stores/types";

export const getDates = (
  duty: Duty,
  member: string,
  startCountDate = new Date(2024, 2, 4),
  endCountDate = new Date(2024, 4, 31)
): { start: number; end: number }[] => {
  const oneDayInverval = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // TODO: force UTC
  const startInTs = startCountDate.getTime();
  const endInTs = endCountDate.getTime();

  const userIndex = duty.members.indexOf(member);

  const dates = [];

  let interval = 0;
  let userShift = 0;

  switch (duty.duty_type) {
    case "regular":
      interval = oneDayInverval * (duty.duty_length || 1);
      userShift = userIndex * interval;
      for (
        let timestamp = startInTs + userShift;
        timestamp <= endInTs;
        timestamp += interval * duty.members.length
      ) {
        dates.push({ start: timestamp, end: timestamp + interval });
      }
      break;
    case "weekdays":
      // TODO: handle not first day of week startInTs
      interval = oneDayInverval * 7;
      userShift = userIndex * interval;
      for (
        let timestamp = startInTs + userShift;
        timestamp <= endInTs;
        timestamp += interval * duty.members.length
      ) {
        const endTimestamp = oneDayInverval * 5; // only weekdays
        dates.push({ start: timestamp, end: timestamp + endTimestamp });
      }
      break;
    case "weekly":
      // handle duty_change_day
      interval = oneDayInverval * 7;
      userShift = userIndex * interval;
      for (
        let timestamp = startInTs + userShift;
        timestamp <= endInTs;
        timestamp += interval * duty.members.length
      ) {
        dates.push({ start: timestamp, end: timestamp + interval });
      }
      break;
  }

  return dates;
};

export function getTimestamps(
  userIndex,
  numUsers,
  regularity,
  duty_length = 7,
  dutyChangeDay = 0,
  startCountDate = new Date(2024, 2, 1),
  endCountDate = new Date(2024, 4, 31)
) {
  const diffInTime = endCountDate.getTime() - startCountDate.getTime();
  const totalDays = Math.round(diffInTime / (1000 * 3600 * 24));
  let dutyDays = [];

  const startDay = userIndex * duty_length + 1;
  const interval = duty_length * numUsers;

  switch (regularity) {
    case "weekdays":
      for (let day = startDay; day <= totalDays; day += interval) {
        let startDate = new Date(startCountDate);
        let endDate = new Date(startCountDate);
        startDate.setDate(day);
        endDate.setDate(day + duty_length);
        dutyDays.push({ start: startDate.getTime(), end: endDate.getTime() });
      }
      return dutyDays;

    case "regular":
      for (let day = startDay; day <= totalDays; day += interval) {
        let startDate = new Date(startCountDate);
        let endDate = new Date(startCountDate);
        startDate.setDate(day);
        endDate.setDate(day + duty_length);
        dutyDays.push({ start: startDate.getTime(), end: endDate.getTime() });
      }
      return dutyDays;

    case "weekly":
      const weeklyStartDay = startDay + dutyChangeDay;
      for (let day = weeklyStartDay; day <= totalDays; day += interval) {
        let startDate = new Date(startCountDate);
        let endDate = new Date(startCountDate);
        startDate.setDate(day);
        endDate.setDate(day + duty_length);
        dutyDays.push({ start: startDate.getTime(), end: endDate.getTime() });
      }
      return dutyDays;
  }
}
