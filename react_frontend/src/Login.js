import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/userContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  // const googleIcon = '/google.png'; // path is relative to the public/ directory
  // const githubIcon = '/github.svg'
  // style={{ backgroundImage: `url(${backgroundImage})` }}

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: 'http://localhost:8000/users/login/',
      method: 'post',
      data: {
        username: username,
        password: password,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.errors) {
          setError("Username or password is incorrect. Try Again!!");
          console.log(result)
        } else {
          // Save the token in local storage
          const newToken = result.data.key;
          console.log("Token: ", newToken)

          window.localStorage.setItem('userToken', newToken);
          setSuccessMessage('Logged In successfully!');

          const getUserInfo = async () => {
            const userInfoResponse = await axios.get('http://localhost:8000/users/profile/', {
              headers: {
                Authorization: `Token ${newToken}`,
              },
            });
            
            setUser(userInfoResponse.data);
            //Redirect the user to the home page
            navigate('/dashboard');
          };
          getUserInfo();
          // This depends on your routing setup
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Username or password is incorrect. Try Again!!");
      });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img width="250" height="250" src="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png" class="attachment-large size-large wp-image-3255" alt="" loading="lazy" srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w" sizes="(max-width: 592px) 100vw, 592px" className='p-3' />
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-cyan-950 md:text-2xl dark:text-white">
              Login to account
            </h1>
            {/* login with google and login with github buttons */}
            <div class="flex flex-row space-x-2">
              <button type="button" class="text-white bg-gray-300 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                </svg>
                Sign in with Github
              </button>
              <button type="button" class="text-white bg-gray-300 hover:bg-cyan-950 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                  <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                </svg>
                Sign in with Google
              </button>
            </div>
            {/* or div to separate the two */}
            <div class="relative mt-4">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 text-gray-500 bg-white dark:bg-gray-800">
                  Or continue with
                </span>
              </div>
            </div>
            <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              {error && <p className='text-red-600 font-normal'>{error}</p>}
              {successMessage && <p className='text-green-500 font-semibold'>{successMessage}</p>}
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-950 focus:border-cyaring-cyan-950 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-950 dark:focus:border-cyan-950" required="" />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-950 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm flex flex-row space-x-[100px]">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300 items-start">Remember me</label>
                  {/* forgot password */}
                  <a href="/reset_password" class="text-md items-end mr-2 font-medium text-yellow-500 hover:
                  underline dark:text-purple-300">Forgot your password?</a>
                </div>
              </div>

              <button type="submit" onClick={handleSubmit} class="w-full text-white bg-gray-300 hover:bg-yellow-500 hover:text-cyan-950 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
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