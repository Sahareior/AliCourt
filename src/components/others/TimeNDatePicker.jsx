import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDispatch } from 'react-redux';
import { pinnedCalendar } from '../../redux/Slices/userSlice';

dayjs.extend(customParseFormat);

const TimeNDatePicker = ({data}) => {
  const [datetime, setDatetime] = useState(() => {
    // Load initial value from localStorage if available
    const stored = localStorage.getItem('datetime');
    return stored ? JSON.parse(stored) : { date: null, time: null };
  });

  const dispatch = useDispatch()

  const handleChange = (type, value) => {
    const formattedValue = value ? value.format(type === 'date' ? 'YYYY-MM-DD' : 'HH:mm') : null;
    const updated = {
      ...datetime,
      [type]: formattedValue,
    };

    setDatetime(updated);
    // localStorage.setItem('datetime', JSON.stringify(updated)); 
    dispatch(pinnedCalendar({data:data, time:updated}))
    // Save to localStorage
  };

  return (
    <div className="flex gap-2 items-center">
      <DatePicker
        onChange={(value) => handleChange('date', value)}
        value={datetime.date ? dayjs(datetime.date, 'YYYY-MM-DD') : null}
      />
      <TimePicker
        onChange={(value) => handleChange('time', value)}
        value={datetime.time ? dayjs(datetime.time, 'HH:mm') : null}
      />
    </div>
  );
};

export default TimeNDatePicker;
