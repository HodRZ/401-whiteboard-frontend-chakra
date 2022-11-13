import React from 'react';
import { useAuth } from '../../State/AuthContext';
import './Sidebar.css';

function Sidebar(props) {
    const { logout, userState } = useAuth();

    return (
        <div className='flex fixed h-screen shadow-xl p-2 top-0 left-0 '>
            <div className='flex flex-col gap-3 font-mono'>
                <i>home</i>
                <i>about</i>
                <i>contact</i>
                <i>support</i>
                <i>Profile</i>
                {userState.isLoggedIn && <button className='border-b-2 border-white shadow-xl hover:bg-action hover:text-purple-200 rounded-xl my-3' onClick={logout}>logout</button>}
            </div>
        </div>
    );
}

export default Sidebar;