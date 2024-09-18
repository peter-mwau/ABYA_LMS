import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await axios.get(url, {
					headers: {
						Authorization: `Token ${localStorage.getItem("userToken")}`,
					},
				});
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				setError(error);
			}
		};

		fetch();
	}, [url]);

	return { data, error };
};

export default useFetch;
