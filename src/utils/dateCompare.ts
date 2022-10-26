import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dateNow = dayjs().toDate();

function convertToUTC(date: Date) {
  return dayjs.utc(date).local().format();
}

export function compareInHours(start_date, end_date: Date): number {
  const utc_end_date = convertToUTC(end_date);
  const compareDate = dayjs(utc_end_date).diff(start_date, 'hours');

  return compareDate;
}

export function compareInDays(start_date, end_date: Date) {
  const utc_end_date = convertToUTC(end_date);
  const compareDate = dayjs(utc_end_date).diff(start_date, 'days');

  return compareDate;
}

export function addDays(days: number): Date {
  return dayjs().add(days, 'days').toDate();
}

export function addHours(hours: number): Date {
  return dayjs().add(hours, 'hours').toDate();
}
