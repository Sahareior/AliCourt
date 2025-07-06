import React from 'react';

import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

const ClassBySec = () => {
  const { id } = useParams(); // get dynamic id from route
  const classes = useSelector((state) => state.user.classWithChat || []);

  // Convert id to cnnumber if your classId is a number

console.log('useParams id:', id);
console.log('Redux classWithChat:', classes);
const classData = classes.find(item => item.classId == id);
console.log('Matched classData:', classData);

  return (
    <div className="p-6  h-[85vh">
      {classData ? (
        <>
          {/* <Link to='/edit-chat' state={{date:items}} key={items.id} className='flex justify-between px-6 mt-3  items-center'></Link> */}
<Link  to='/edit-chat' state={{date:classData.chat}} className='border flex justify-center items-center flex-col p-4 w-80'>
    <h3>Unnamed Edit</h3>c
    <p>Timestapm: 6\4\2025</p>
</Link>
        </>
      ) : (
        <p className="text-gray-600">No class found with ID {id}.</p>
      )}
    </div>
  );
};

export default ClassBySec;
