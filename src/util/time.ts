import { TimeObj } from 'types/time.d.ts';

export const hourCounter = ({ total }: { total: number }) => {
  const hours = [...Array(total).keys()];
  const times: TimeObj[] = [];
  hours.forEach(hour => {
    times.push({ hour: hour, minute: 0 });
    times.push({ hour: hour, minute: 30 });
  });
  return times;
};

export const convertToMin = (time: TimeObj) => {
  return time?.hour * 60 + time?.minute;
};
