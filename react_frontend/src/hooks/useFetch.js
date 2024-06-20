import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
	const [courses, setCourses] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userToken = localStorage.getItem("userToken");
				console.log(userToken);
				const response = await axios.get(url, {
					headers: {
						Authorization: `Token ${userToken}`,
					},
				});
				setCourses(response.data);
				console.log("Courses: ", response);
				setIsLoading(false);
			} catch (err) {
				setIsError(err.response ? err.response.data : "Error fetching courses");
				setIsLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { courses, isLoading, isError };
};

export default useFetch;
