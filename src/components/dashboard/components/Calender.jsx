import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

const Calender = () => {
  const [value, setValue] = useState(new Date());

  // Get from localStorage and parse
  const time = JSON.parse(localStorage.getItem('datetime') || '{}');
  console.log('Saved time:', time);

  // Create pinned date if both date and time exist
  const pinnedDate = time?.date && time?.time
    ? dayjs(`${time.date}T${time.time}`).startOf('day').toDate()
    : null;

  // Optional: Set calendar value to pinned on load
  useEffect(() => {
    if (pinnedDate) {
      setValue(pinnedDate);
    }
  }, [pinnedDate]);

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
