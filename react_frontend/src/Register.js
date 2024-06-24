import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user_type, setUser_type] = useState('');
  // const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  // const backgroundImage = '/web3.jpg'; // path is relative to the public/ directory
  // style={{ backgroundImage: `url(${backgroundImage})` }}

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if passwords match
  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match!!');
    return;
  }

    axios.post('http://localhost:8000/users/register/', {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      user_type: Number(user_type),
    })
    .then((response) => {
      // Redirect the user to the login page
      console.log(response);
      window.location.href = '/login';
      // This depends on your routing setup
      setSuccessMessage('Registration successful! Please login.');
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data);
        // Set the error message
        if (error.response.data.username) {
          setErrorMessage(error.response.data.username[0]);
        } else if (error.response.data.email) {
          setErrorMessage(error.response.data.email[0]);
        } else {
          setErrorMessage(error.message);
        }  // print the response body
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Error in sending request');
      }
    });
  };
  return (
<section class="bg-gray-100 dark:bg-gray-900 h-auto" >
<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <img width="250" height="250" src="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png" class="attachment-large size-large wp-image-3255" alt="" loading="lazy" srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w" sizes="(max-width: 592px) 100vw, 592px" className='p-3' /> 
    <div class="w-full bg-gray-250 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-cyan-950 md:text-2xl dark:text-white">
                Create an account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
            {successMessage && <p className='text-green-500 font-semibold'>{successMessage}</p>}
            {errorMessage && <p className='text-red-500 font-normal'>{errorMessage}</p>}
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Your username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
                </div>
                <div className='lg:flex lg:flex-row lg:gap-2 md:flex md:flex-row md:gap-2'>
                  <div>
                    <label for="firstName" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Your first name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                  </div>
                  <div>
                    <label for="lastName" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Your last name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                  </div>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Your email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="usertype" className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">User type</label>
                    <select value={user_type} onChange={(e) => setUser_type(e.target.value)} name="usertype" id="usertype" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option value="">Select user type</option>
                      <option value="1">Student</option>
                      <option value="2">Teacher</option>
                    </select>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Confirm password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-200 focus:ring-3 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="terms" class="font-light text-gray-600 dark:text-gray-300">I accept the Terms and Conditions</label>
                      {/* <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"></a> */}
                    </div>
                </div>
                <button type="submit" class="w-full text-cyan-950 bg-gray-300 hover:bg-yellow-500 hover:text-cyan-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                {errorMessage && <p className='text-red-500 font-semibold'>{errorMessage}</p>}
                <p class="text-sm font-light text-gray-600 dark:text-gray-400">
                    Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
            </form>
        </div>
    </div>
</div>
</section>
  );
}



export default Register;