import { useState, useEffect } from 'react';
import moment from 'moment';

const getWeekDaysWithDate = () => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the current date and add 1 day to start from tomorrow
    const currentDate = moment().add(1, 'day');

    // Calculate the start of the week (Sunday) and initialize the array with dates
    const startOfWeek = moment(currentDate).startOf('isoWeek');
    const weekDates = Array.from({ length: 7 }, (_, index) =>
      moment(startOfWeek).add(index, 'days')
    );

    // Format the data as per your requirements
    const formattedWeekDays = weekDates.map(date => ({
      day: daysInWeek[date.day()].substring(0,3),
      date: date.format('YYYY-MM-DD'),
    }));

    setWeekDays(formattedWeekDays);
  }, []); // Run this effect only once on component mount

  return weekDays;
};

export default getWeekDaysWithDate;
