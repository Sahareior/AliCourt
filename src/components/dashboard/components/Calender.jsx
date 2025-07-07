import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const Calender = () => {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(null);

 const date = useSelector((state) => state.user.pinned || []);

console.log('pinned', date)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('datetime');
      const parsed = stored ? JSON.parse(stored) : null;

      if (parsed?.date && parsed?.time) {
        setTime(parsed);
        const pinned = dayjs(`${parsed.date}T${parsed.time}`).startOf('day').toDate();
        setValue(pinned);
      }
    } catch (error) {
      console.warn('Invalid datetime in localStorage:', error);
      // Optionally clear corrupted value
      localStorage.removeItem('datetime');
    }
  }, []);

  const pinnedDate =
    time?.date && time?.time
      ? dayjs(`${time.date}T${time.time}`).startOf('day').toDate()
      : null;

  return (
    <div className="">
      <div className="bg-white p-6 border-none rounded-xl">
        <Calendar
          onChange={setValue}
          value={value}
          view="month"
          className="border-none bg-none text-2xl"
          tileContent={({ date, view }) =>
            view === 'month' &&
            pinnedDate &&
            date.toDateString() === pinnedDate.toDateString() ? (
              <div className="flex justify-center items-center -mt-9">
                <span className="h-2 w-2 rounded-full bg-red-600 block"></span>
              </div>
            ) : null
          }
        />

        {pinnedDate && (
          <div className="mt-4 text-gray-600 text-sm">
            📌 Pinned for: {dayjs(pinnedDate).format('YYYY-MM-DD')} at {time.time}
          </div>
        )}
      </div>
    </div>
  );
};


export default Calender;
