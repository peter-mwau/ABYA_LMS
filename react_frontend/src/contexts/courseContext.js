import React from "react";

export const CourseContext = React.createContext({
	courseDetail: null,
	setCourseDetail: () => {}, // default function that does nothing
});
