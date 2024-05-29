import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
import Navbar from './Navbar';

const Profile = () => {
    const [user, updateUser] = useState(null);
    const [profile, updateProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

  
    useEffect(() => {
      const fetchProfile = async () => {
        const userToken = localStorage.getItem('userToken');
        console.log(userToken);
        try {
          const response = await axios.get('http://localhost:8000/users/profile/', {
            headers: {
                'Authorization': `Token ${userToken}`
            },
          });
          updateUser(response.data);
          console.log('Fetched data:', response.data);
          // console.log('Fetched profile:', response.data.profile);
          updateProfile(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          setIsLoading(false);
        }
      };
  
      fetchProfile();
    }, []);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
    
      if (file) {
        updateProfile({
          ...profile,
          avatar: file
        });
      }
    };

    console.log('Current profile:', profile);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
    
      if (name in user) {
        updateUser({
          ...user,
          [name]: value
        });
      } else if (profile && name in profile) {
        updateProfile({
          ...profile,
          [name]: value
        });
      }
    };
    
      const handleEdit = () => {
        setIsEditing(true);
      };
    
      const handleSave = async () => {
        const userToken = localStorage.getItem('userToken');
        const formData = new FormData();
      
        for (const key in user) {
          formData.append(key, user[key]);
        }
      
        if (profile && profile.avatar instanceof File) {
          formData.append('avatar', profile.avatar);
        }
      
        try {
          const response = await axios.put('http://localhost:8000/users/profile/', formData, {
            headers: {
              'Authorization': `Token ${userToken}`
            },
          });
      
          if (response.status === 200) {
            updateUser(response.data);
            setIsEditing(false);
            window.location.reload();
          }
        } catch (error) {
          console.error('Failed to update user data:', error);
        }
      };

  if (!user) {
    return <div>Loading...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className='bg-transparent h-auto lg:h-[90vh] pt-[15%] lg:pt-[5%] container items-center justify-center mx-auto text-cyan-900'>
        <div className='shadow-lg shadow-cyan-950 p-5 rounded-md lg:w-[70%] lg:items-center lg:justify-center lg:mx-auto'>
            {/* <Link to='/home' className='bg-green-500 hover:bg-green-400 p-2 items-end rounded-md font-semibold'>Back</Link> */}
        <h2 className='text-center p-4 font-semibold text-2xl uppercase lg:pb-[40px]'>Profile Details</h2>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-4 lg:justify-evenly lg:w-[80%] lg:mx-auto'>
        {/* <p>Username: {isEditing ? <input value={user.username} className='border-gray-500 border-2 rounded-md p-2'/> : user.username}</p> */}
        <p>Username: {isEditing ? <input name="username" value={user.username} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : user.username}</p>
        <p>First Name: {isEditing ? <input name='firstname' value={user.firstname} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : user.firstname}</p>
        <p>Last Name: {isEditing ? <input name='lastname' value={user.lastname} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : user.lastname}</p>
        <p>Email: {isEditing ? <input name='email' value={user.email} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : user.email}</p>
        <p>Is Superuser: {user.issuperuser ? 'Yes' : 'No'}</p>
        <p>Is Staff: {user.isstaff ? 'Yes' : 'No'}</p>
        <p>Date Joined:{user.datejoined}</p>
        <p>Last Login: {user.lastlogin}</p>
        <p>Is Active: {user.isactive ?  'Yes' : 'No'}</p>
        <p>User Type: {user.user_type}</p>
        <p>Phone Number: {isEditing ? <input name='phone' type='number' value={user ? user.phone : ''} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : "+254 " + user.phone}</p>
        <p>Bio: {isEditing ? <textarea name='bio' value={user ? user.bio : ''} onChange={handleInputChange} className='border-gray-500 border-2 rounded-md p-2'/> : user.bio}</p>
        <p>Avatar: {isEditing ? <input type='file' name='avatar' onChange={handleImageChange} className='rounded-md p-2'/> : user.avatar}</p>
        </div>
        <button className='bg-cyan-950 hover:bg-yellow-500 text-white uppercase hover:cursor-pointer p-2 items-center justify-center mx-auto w-[70%] rounded-md font-semibold flex mt-[80px]' onClick={isEditing ? handleSave : handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </div>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Profile;