import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Homepage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios({
      url: 'http://localhost:8000/users/me/',
      method: 'get',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    .then((response) => {
      setUsername(response.data.username);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      <p className='text-gray-700 text-bold'>Welcome, {username}!</p>
    </div>
  );
}

export default Homepage;