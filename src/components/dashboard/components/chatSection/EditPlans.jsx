import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const EditPlans = () => {
    const edited = useSelector(state => state.user.edited)
    console.log('edited', edited)
    return (
        <div>
         {
            edited.map(items =>(
                  <Link to='/edit-chat' state={{date:items}} key={items.id} className='flex justify-between px-6 mt-3  items-center'>
                  <h4>Last Chat</h4>
                  <BsThreeDots />
                </Link>
            ))
         }
        </div>
    );
};

export default EditPlans;