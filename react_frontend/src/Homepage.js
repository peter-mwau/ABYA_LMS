import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Homepage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/graphql/', // replace with your GraphQL endpoint
      method: 'post',
      data: {
        query: `
          query {
            users {
              id
              firstName
              lastName
              userType
            }
          }
        `
      }
    })
    .then((result) => {
      setUsers(result.data.data.users);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      {users.map(user => (
        <p key={user.id} className='bg-red-400 p-2 m-2 rounded-md'>
          {user.id}: {user.firstName} {user.lastName}: {user.userType}
        </p>
      ))}
    </div>
  );
}

export default Homepage;