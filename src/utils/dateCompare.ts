import dayjs from 'dayjs';

export function dateCompare(end_date: Date): number {
  const compareDate = dayjs(end_date).diff(dayjs().toDate(), 'hours');
  return compareDate;
}
