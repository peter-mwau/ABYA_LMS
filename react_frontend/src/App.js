// import logo from './logo.svg';
import "./App.css";
// import { useEffect, useState } from 'react';
import {
	// BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset_Password from "./Reset_Password";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Navbar from "./Navbar";
import SideNav from "./SideNav";

function App() {
	const location = useLocation();
	const paths = ["/login", "/register", "/"];

	return (
		<>
			{!paths.includes(location.pathname) && (
				<>
					<Navbar /> <SideNav />
				</>
			)}
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="register/" element={<Register />} />
				<Route path="reset_password/" element={<Reset_Password />} />
				<Route path="profile/" element={<Profile />} />
        <Route path="create-chapter/" element={<ChapterForm />} />
        <Route path="create-lesson/" element={<LessonForm />} />
        <Route path="course-list/" element={<CourseList />} />

			</Routes>
		</>
	);
}

export default App;
