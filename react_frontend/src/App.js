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
// import Reset_Password from "./Reset_Password";
import React from "react";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Profile from "./profile/Profile";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import ChapterForm from "./components/courseComponents/ChapterForm";
import LessonForm from "./components/courseComponents/LessonForm";
import CourseList from "./components/courseComponents/CourseList";
import QuizForm from "./components/QuizComponents/QuizForm";
import { UserContext } from "./contexts/userContext";
import Providers from "./Provider";
import CreateCourse from "./components/courseComponents/CreateCourse";
import CourseContent from "./components/courseComponents/CourseContent";
import QuestionForm from "./components/QuizComponents/QuestionForm";

function App() {
	const location = useLocation();
	const paths = ["/login", "/register", "/"];
	const userDetails = React.useContext(UserContext);

	return (
		<Providers>
			{!paths.includes(location.pathname) && (
				<>
					<Navbar /> <SideNav userDetails={userDetails} />
				</>
			)}
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="register/" element={<Register />} />
				{/* <Route path="reset_password/" element={<Reset_Password />} /> */}
				<Route path="profile/" element={<Profile />} />
				<Route path="create-course/" element={<CreateCourse />} />
				<Route path="create-chapter/" element={<ChapterForm />} />
				<Route path="create-lesson/" element={<LessonForm />} />
				<Route path="course-list/" element={<CourseList />} />
				<Route path="course/:courseId" element={<CourseContent />} />
				<Route path="create-quiz" element={<QuizForm />} />
				<Route path="create-question" element={<QuestionForm />} />
			</Routes>
		</Providers>
	);
}

export default App;
