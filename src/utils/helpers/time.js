export const convertTo24HourFormat = timeString => {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');

  let hours24 = parseInt(hours, 10);

  if (period === 'PM' && hours24 !== 12) {
    hours24 += 12;
  } else if (period === 'AM' && hours24 === 12) {
    hours24 = 0;
  }
  const formattedTime = `${hours24.toString().padStart(2, '0')}:${minutes}`;
  return formattedTime;
};

export const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(':');
  let period = 'AM';

  let hours12 = parseInt(hours, 10);

  if (hours12 >= 12) {
    period = 'PM';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }

  const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes} ${period}`;

  return formattedTime;
}