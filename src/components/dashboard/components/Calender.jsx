import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
  const [value, onChange] = useState(new Date());
  
  return (
    <div className="">
      <div className="bg-white p-6 border-none rounded-xl ">
        <Calendar 
          onChange={onChange} 
          value={value}
          className="border-none  text-2xl" // Increased width & height
        />
      </div>
    </div>
  );
};

export default Calender;