import { useState } from "react";
// import landingImage from './web3.jpg';



const Homepage = () => {
    const landingImage = './web3.jpg';
    const [isHidden, setIsHidden] = useState(true);

    const toggleNav = () => {
        document.addEventListener("DOMContentLoaded", function() {
            const openSidenavButton = document.getElementById("openSidenav");
            
    
            openSidenavButton.addEventListener("click", function() {
                if (isHidden) {
                    // sidenav.style.width = "250px"; // Adjust the width as needed
                    setIsHidden(!isHidden)
                } else {
                    // sidenav.style.width = "0";
                    setIsHidden(isHidden);
                }
            });
        });
    };

    const sectionStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${landingImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh', // Adjust as needed
        };

    return ( 
    <body class="bg-gray-200 text-white">
    <div id="landing" style={sectionStyle} class="w-full h-[100vh] mx-auto flex flex-col items-center justify-center bg-black bg-opacity-10">
        <div class="h-[70px, auto] w-full p-2 flex flex-row relative my-auto space-x-[30%] container lg:container lg:justify-center lg:items-center lg:mx-auto">
            <div class="items-start p-1 m-2">
                <img width="400" height="400" src="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png" class="attachment-large size-large wp-image-3255" alt="" loading="lazy" srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w" sizes="(max-width: 592px) 100vw, 592px" />
            </div>
            <div class="lg:my-auto lg:flex text-white font-bold lg:items-end lg:mx-auto hidden space-x-3">
                <a href="/" class="text-yellow-400 text-xl p-1 rounded-2xl hover:text-white hover:shadow-md transition duration-300 ease-in-out font-bold py-2 px-4">Home</a>
                <a href="/login" class="text-white  text-xl hover:text-yellow-400 hover:border-yellow-400 hover:rounded-2xl hover:shadow-md hover:transition-transform hover:scale-105 transition duration-300 ease-in-out font-bold py-2 px-4">Login</a>
                <a href="/register" class="text-white  text-xl hover:text-yellow-400 hover:border-yellow-400 hover:rounded-2xl hover:shadow-md hover:transition-transform hover:scale-105 transition duration-300 ease-in-out font-bold py-2 px-4">Register</a>
                <a href="#about" class="text-white  text-xl hover:text-yellow-400 hover:border-yellow-400 hover:rounded-2xl hover:shadow-md hover:transition-transform hover:scale-105 transition duration-300 ease-in-out font-bold py-2 px-4">About</a>
                <a href="#contact" class="text-white  text-xl hover:text-yellow-400 hover:border-yellow-400 hover:rounded-2xl hover:shadow-md hover:transition-transform hover:scale-105 transition duration-300 ease-in-out font-bold py-2 px-4">Contact</a>
            </div>
            
        </div>
        <div class="index-image text-yellow-400">
            <div class="mx-auto items-center flex justify-center w-[80%] py-5">
                <div class="flex flex-row my-auto space-x-4 w-auto lg:gap-10">
                <div class="items-start mx-auto justify-start my-auto m-3 space-x-5 w-1/2 lg:space-y-5">
                    <h1 class="text-5xl">Learning Management System</h1>
                    <p class="text-gray-100 ">Innovation. Creativity. Teamwork.</p>
                    <p class="bg-gray-100 bg-opacity-60 hover:text-cyan-950 hover:bg-opacity-80  rounded-md shadow-sm p-2 mt-2 hover:shadow-2xl w-auto"><a href="{% url 'courses:list' %}" class="mx-auto items-center justify-center flex text-xl font-serif font-semibold decoration-none hover:no-underline text-black ">View All Courses</a></p>
                </div>
                <div class="hidden lg:flex items-end justify-end my-auto">
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt="" class="img-fluid w-[600px]" />
                </div>
                </div>
            </div>
            <div class="bg-black bg-opacity-40 m-2 p-2 items-center justify-center flex mx-auto hover:cursor-pointer hover:translate-y-2 hover:delay-100 rounded-lg h-[200px] w-1/2 hover:bg-opacity-60 hover:text-yellow-400 hover:animate-pulse transition duration-300 ease-in-out">
                <p class="text-3xl font-semibold font-serif text-center items-center justify-center mx-auto my-auto flex text-yellow-400">Empowering The Next Generation of Change Leaders</p>
            </div>
        </div>
        {/* <!-- Navigation button --> */}
    <button id="openSidenav" onClick={toggleNav} class="text-white p-2 lg:hidden rounded-lg hover:bg-yellow-500 hover:text-black hover:shadow-md transition duration-300 ease-in-out fixed top-4 right-4 z-10">☰</button>

    {/* <!-- Sidenav container --> */}
    <div id="sidenav" className={`sidenav ${isHidden ? 'hidden' : ''} w-[250px] hidden h-full absolute top-0 right-0 bg-cyan-950 text-white overflow-x-hidden transition duration-300 ease-in-out`}>
        {/* <!-- Sidenav content goes here --> */}
        <div class="p-4">
            <a href="{% url 'home' %}" class="text-white block py-2 px-4 hover:bg-yellow-500 hover:text-black hover:rounded-lg transition duration-300 ease-in-out font-bold">Home</a>
            <a href="{% url 'users:login' %}" class="text-white block py-2 px-4 hover:bg-yellow-500 hover:text-black hover:rounded-lg transition duration-300 ease-in-out font-bold">Login</a>
            <a href="{% url 'users:signup' %}" class="text-white block py-2 px-4 hover:bg-yellow-500 hover:text-black hover:rounded-lg transition duration-300 ease-in-out font-bold">Register</a>
            <a href="#about" class="text-white block py-2 px-4 hover:bg-yellow-500 hover:text-black hover:rounded-lg transition duration-300 ease-in-out font-bold">About</a>
            <a href="#contact" class="text-white block py-2 px-4 hover:bg-yellow-500 hover:text-black hover:rounded-lg transition duration-300 ease-in-out font-bold">Contact</a>
        </div>
    </div>
    </div>
   {/* <!-- About Section --> */}
<section id="about" class="about bg-gray-100 py-16">
    <div class="container mx-auto px-4">
        <div class="flex flex-col items-center">
            <h2 class="text-3xl font-semibold text-cyan-950 mb-4 underline-offset-auto uppercase">Why We Are The Best!</h2>
            <div class="ekit_heading_separetor_wraper">
                <div class="elementskit-border-divider"></div>
            </div>
            <p class="text-lg text-gray-600 text-center max-w-2xl">
                Abya is your gateway to a world of knowledge and learning. We are dedicated to empowering the next generation of change leaders through innovative education and creative collaboration.
            </p>
        </div>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-transparent p-6 rounded-lg flex flex-row hover:cursor-pointer hover:shadow-md transition delay-200 ease-in-out">
                <img src="learn.png" alt="Learn Together Icon" class="w-[150px] h-[150px] text-cyan-950 mr-2 my-auto" />
                <div class="flex flex-col my-auto">
                <h3 class="text-xl font-semibold text-cyan-950 mb-2">Learn Together</h3>
                <p class="text-gray-600">
                    Learning together with like-minded participants has proven to be more effective than learning alone.
                </p>
                </div>
            </div>
            <div class="bg-transparent p-6 rounded-lg flex flex-row hover:cursor-pointer hover:shadow-md transition delay-200 ease-in-out">
                <img src="available.png" alt="Available Icon" class="w-[150px] h-[150px] text-cyan-950 mr-2 my-auto" />
                <div class="flex flex-col my-auto">
                <h3 class="text-xl font-semibold text-cyan-950 mb-2">Available from Anywhere Any Device</h3>
                <p class="text-gray-600">
                    No matter where you are or in which part of the country you reside in, you can learn from anywhere.
                </p>
            </div>
            </div>
            <div class="bg-transparent p-6 rounded-lg flex flex-row hover:cursor-pointer hover:shadow-md transition delay-200 ease-in-out">
                <img src="everywhere.png" alt="Available Icon" class="w-[150px] h-[150px] text-cyan-950 mr-2 my-auto" />
                <div class="flex flex-col my-auto">
                    <h3 class="text-xl font-semibold text-cyan-950 mb-2">Access Mentors</h3>
                    <p class="text-gray-600">
                        Throughout the Learning journey, you will have access to mentors -- who are influential leaders in the disruptive tech space.
                    </p>
                </div>
            </div>
            <div class="bg-transparent p-6 rounded-lg flex flex-row hover:cursor-pointer hover:shadow-md transition delay-200 ease-in-out">
                <img src="fun.png" alt="Available Icon" class="w-[150px] h-[150px] text-white mr-2 my-auto" />
                <div class="flex flex-col my-auto">
                <h3 class="text-xl font-semibold text-cyan-950 mb-2">Fun & Easy to Follow Content</h3>
                <p class="text-gray-600">
                    Learn the basics and then proceed to intermidiate level, from zero knowledge and skill to the deep dive of developing smart contracts.
                </p>
            </div>
            </div>
        </div>
        <div class="lg:flex lg:flex-row flex-row md:flex-row mt-5 lg:relative lg:w-[70%] container p-2 lg:mx-auto lg:items-center lg:justify-center lg:h-[400px] md:h-auto hidden">
            <div class="items-start bg-gray-200 text-cyan-950 p-5 sm:h-[400px]">
                <p class="mx-auto items-center justify-center flex font-bold text-xl">Our Values</p>
                <div class="mx-auto m-2 flex items-center justify-center max-w-[500px] h-auto flex-row flex-wrap ">
                    <div class="flex flex-col hover:cursor-pointer hover:bg-white transition delay-200 ease-in-out p-2">
                        <img src="innovation.png" alt="Available Icon" class="w-[100px] h-[100px] text-cyan-950 mr-2 my-auto" />
                        <p class="mx-auto items-center justify-center flex">Innovation</p>
                    </div>
                    <div class="flex flex-col hover:cursor-pointer hover:bg-white transition delay-200 ease-in-out p-2">
                        <img src="creativity.png" alt="Available Icon" class="w-[100px] h-[100px] text-cyan-950 mr-2 my-auto" />
                        <p class="mx-auto items-center justify-center flex">Creativity</p>
                    </div>
                    <div class="flex flex-col hover:cursor-pointer hover:bg-white transition delay-200 ease-in-out p-2">
                        <img src="teamwork.png" alt="Available Icon" class="w-[100px] h-[100px] text-cyan-950 mr-2 my-auto" />
                        <p class="mx-auto items-center justify-center flex">Teamwork</p>
                    </div>
                    <div class="flex flex-col hover:cursor-pointer hover:bg-white transition delay-200 ease-in-out p-2">
                        <img src="diversity.png" alt="Available Icon" class="w-[100px] h-[100px] text-cyan-950 mr-2 my-auto" />
                        <p class="mx-auto items-center justify-center flex">Diversity</p>
                    </div>
                    <div class="flex flex-col hover:cursor-pointer hover:bg-white transition delay-200 ease-in-out p-2">
                        <img src="integrity.png" alt="Available Icon" class="w-[100px] h-[100px] text-cyan-950 mr-2 my-auto" />
                        <p class="mx-auto items-center justify-center flex">Integrity</p>
                    </div>
                </div>
            </div>
            <div class="items-end bg-cyan-950 text-yellow-500  lg:pt-10 p-2 max-w-[500px] h-[400px] sm:p-2 sm:w-1/2 sm:h-[400px]">
                <span class="my-auto container">
                <p class="mx-auto items-center justify-center flex font-bold text-xl">How can we Help You?</p>
                <p class="items-center justify-center p-2 m-2 mx-auto flex text-white">Are you a university student and want to change the course of history? Do you want to be part of something bigger than yourself? If your answer is YES, then ABYA is the place for you! </p>
                <button class="bg-gray-100 m-2 p-2 mx-auto items-center justify-center flex text-cyan-950 font-bold rounded-md hover:bg-yellow-500 transition delay-200 ease-in-out">Register Today!</button>
                </span>
            </div>
        </div>
    </div>
</section>

{/* <!-- Contact Section --> */}
<section id="contact" class="contact bg-cyan-950 text-white py-16">
    <div class="container mx-auto px-4">
        <div class="flex flex-col items-center sm:pt-4">
            <h2 class="text-3xl font-semibold mb-4 underline-offset-auto uppercase">Contact Us</h2>
            <div class="ekit_heading_separetor_wraper">
                <div class="elementskit-border-divider"></div>
            </div>
        </div>
        <div class="m-2 p-2 mx-auto flex flex-col sm:flex-row md:flex-row sm:w-full">
            {/* <!-- Add your contact information or contact form here --> */}
            <div class="items-start left-5 my-auto sm:mx-auto">
            <img width="400" height="400" src="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png" class="attachment-large size-large wp-image-3255" alt="" loading="lazy" srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w" sizes="(max-width: 592px) 100vw, 592px" />
            </div>
             {/* <!-- Quick Links --> */}
             <div class="w-full flex flex-col md:w-1/2 p-5 m-2 items-center my-auto sm:mx-auto sm:w-full sm:flex">
                <h3 class="text-2xl font-semibold mb-4">Quick Links</h3>
                <ul class="space-y-2">
                    <li><a href="#landing" class="hover:text-yellow-500 hover:cursor-pointer hover:no-underline">Home</a></li>
                    <li><a href="#rr" class="hover:text-yellow-500 hover:cursor-pointer hover:no-underline">Courses</a></li>
                    <li><a href="#about" class="hover:text-yellow-500 hover:cursor-pointer hover:no-underline">About Us</a></li>
                    <li><a href="#contact" class="hover:text-yellow-500 hover:cursor-pointer hover:no-underline">Contact Us</a></li>
                </ul>
            </div>
            <div class="w-full md:w-1/2 p-5 m-2 my-auto  mx-auto items-center justify-center">               
                {/* <!-- Contact Info --> */}
                <div class="mt-6 md:mt-0">
                    <div class="text-white p-6 rounded-lg h-full  mx-auto items-center justify-center">
                        <p class="text-lg font-semibold">Contact Information</p>
                        <ul class="mt-4 space-y-2">
                            <li class="hover:text-yellow-500"><i class="fa fa-map-marker text-2xl p-2"></i>Crystal Business Plaza, Off Magadi Road, Rongai, Kenya</li>
                            <li class="hover:text-yellow-500"><i class="fa fa-phone text-2xl p-2"></i>+254 (0) 97546916</li>
                            <li class="hover:text-yellow-500"><i class="fa fa-envelope text-2xl p-2"></i>info@abyauniversity.com</li>
                        </ul>
                        <div class="flex flex-row text-white space-x-4 mt-4">
                            <a href="#https://www.linkedin.com/company/abya-africa" target="_blank" aria-label="LinkedIn" class="linkedin hover:text-yellow-500 transition delay-200 ease-in-out hover:-translate-y-1.5">
                                <i class="fab fa-linkedin fa-2x"></i>
                            </a>
                            <a href="#https://twitter.com/abyaafrica" target="_blank" aria-label="Twitter" class="twitter hover:text-yellow-500 transition delay-200 ease-in-out hover:-translate-y-1.5">
                                <i class="fab fa-twitter fa-2x"></i>
                            </a>
                            <a href="#https://www.facebook.com/abyaafrica" target="_blank" aria-label="Facebook" class="facebook hover:text-yellow-500 transition delay-200 ease-in-out hover:-translate-y-1.5">
                                <i class="fab fa-facebook fa-2x"></i>
                            </a>
                            <a href="#https://www.instagram.com/abyaafrica" target="_blank" aria-label="Instagram" class="instagram hover:text-yellow-500 transition delay-200 ease-in-out hover:-translate-y-1.5">
                                <i class="fab fa-instagram fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="items-end w-full sm:w-2/3 md:w-2/3 shadow-lg my-auto">
                {/* <!-- Contact Form --> */}
                {/* {% comment %} sm:mx-auto sm:w-2/3 md:w-2/3 md:mx-auto {% endcomment %} */}
                <form class="w-full bg-white bg-opacity-90 rounded-lg p-6 shadow-lg sm:mx-auto sm:w-2/3 md:w-2/3 md:mx-auto">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                    <div class="space-y-4">
                        <div class="mb-4">
                            <input type="text" class="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200" placeholder="Your Name" />
                        </div>
                        <div class="mb-4">
                            <input type="email" class="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200" placeholder="Your Email" />
                        </div>
                        <div class="mb-4">
                            <input type="text" class="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200" placeholder="Subject" />
                        </div>
                        <div class="mb-4">
                            <textarea class="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200" rows="4" placeholder="Type your message here"></textarea>
                        </div>
                        <button type="submit" class="w-full py-3 bg-cyan-900 text-white rounded-lg hover:text-black hover:bg-yellow-400 transition duration-300 ease-in-out">Send Message</button>
                    </div>
                </form>
            </div>
            {/* <!-- You can add a contact form here if needed --> */}
        </div>
    </div>
</section>

   
</body>
     );
}
 
export default Homepage;