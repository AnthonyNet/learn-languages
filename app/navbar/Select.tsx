"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function Select() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
		if (theme === "system") {
			setTheme("blue");
		}
	}, []); /*Missing dependency */

	if (!mounted) {
		setTheme("blue");
		return null;
	}

	const currentTheme = theme === "system" ? systemTheme : theme;

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setTheme(e.target.value);
	};

	return (
		<select
			className="outline-none border-animation bg-transparent cursor-pointer text-xl xl:text-3xl __background"
			title="col"
			name="colors"
			id="colors"
			onChange={handleChange}>
			<option value="blue">Modrý</option>
			<option value="green">Zelený</option>
			<option value="violet">Fialový</option>
			<option value="pink">Růžový</option>
			<option value="yellow">Žlutý</option>
			<option value="light">Světlý</option>
		</select>
	);
}
