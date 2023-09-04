"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export const revalidate = 3600;

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
			onChange={handleChange}>
			<option className="text-blue-500" value="blue">
				➊
			</option>
			<option className="text-green-500" value="green">
				❷
			</option>
			<option className="text-violet-500" value="violet">
				❸
			</option>
			<option className="text-pink-500" value="pink">
				❹
			</option>
			<option className="text-yellow-500" value="yellow">
				❺
			</option>
		</select>
	);
}
