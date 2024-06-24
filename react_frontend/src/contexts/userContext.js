import React from "react";

export const UserContext = React.createContext({
	user: null,
	setUser: () => {}, // default function that does nothing
});
