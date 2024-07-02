import React from 'react';
import './style.css'

const Home = () => {
    const user = localStorage.getItem('user');

    return (
        <div className='home'>
            <h1>Welcome {user ? JSON.parse(user).name : 'Guest'}</h1>
            <p>Current Date and Time: {new Date().toLocaleString()}</p>
        </div>
    )
}

export default Home;