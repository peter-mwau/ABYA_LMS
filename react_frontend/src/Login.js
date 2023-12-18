import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const backgroundImage = '/web3.jpg'; // path is relative to the public/ directory
  // style={{ backgroundImage: `url(${backgroundImage})` }}

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
        url: 'http://localhost:8000/graphql/',
        method: 'post',
        data: {
          query: `
            mutation AuthenticateUser($username: String!, $password: String!) {
        authenticateUser(username: $username, password: $password) {
          token
        }
      }
    `,
          variables: {
            username: username,
            password: password,
          },
        },
      })
      .then((result) => {
      if (result.data.errors) {
        setError(result.data.errors[0].message);
        console.log(result)
      } else {
        // Save the token in local storage
        localStorage.setItem('token', result.data.data.authenticateUser.token);
        // Redirect the user to the home page
        navigate('/home');
        // This depends on your routing setup
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <img width="200" height="200" src="https://abyauniversity.com/wp-content/uploads/2022/08/abya-university-resized.png" class="attachment-large size-large wp-image-3255 m-2" alt="" loading="lazy" srcset="https://abyauniversity.com/wp-content/uploads/2022/08/abya-university-resized.png 592w, https://abyauniversity.com/wp-content/uploads/2022/08/abya-university-resized-300x129.png 300w" sizes="(max-width: 592px) 100vw, 592px items-center justify-center" />
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-cyan-950 md:text-2xl dark:text-white">
                  Login to account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                  </div>
                  {/* forgot password */}
                  <a href="/reset_password" class="text-xs font-medium text-purple-600 hover:
                  underline dark:text-purple-300">Forgot your password?</a>
                  <button type="submit" class="w-full text-white bg-gray-300 hover:bg-yellow-500 hover:text-cyan-950 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  {error && <p>{error.message}</p>}
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}

export default Login;