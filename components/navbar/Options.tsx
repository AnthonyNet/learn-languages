import {
	Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export const revalidate = 3600;

export default function Options() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();


	useEffect(() => {
		setMounted(true);
		if (theme === "system") {
			setTheme("blue");
		}
	}, []);

	if (!mounted) {
		setTheme("blue");
		return null;
	}

	const currentTheme = theme === "system" ? systemTheme : theme;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="bg-transparent border-none  __text_color hover:bg-slate-500/20    animate-spin-slow rounded-full">
					<Settings />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 __background __text_color transition-all duration-1000 ease-in-out transform ">
				<DropdownMenuLabel>Settings</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-[var(--color-main)]" />

				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="hover:bg-slate-600/20">
							<span className="mr-2 text-2xl  animate-spin-slow">&#9762;</span>
							<span>Colors</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="__background __text_color">
								<DropdownMenuItem
									className="text-blue-500 hover:bg-blue-500/10 "
									onClick={() => setTheme("blue")}>
									<span className="mr-2 h-8 w-4 text-2xl">➊</span>
									<span>Blue</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-green-500 hover:bg-green-500/10"
									onClick={() => setTheme("green")}>
									<span className="mr-2 h-8 w-4 text-2xl text-green-500">
										❷
									</span>
									<span>Green</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-violet-500 hover:bg-violet-500/10"
									onClick={() => setTheme("violet")}>
									<span className="mr-2 h-8 w-4 text-2xl">❸</span>
									<span>Violet</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-pink-500 hover:bg-pink-500/10"
									onClick={() => setTheme("pink")}>
									<span className="mr-2 h-8 w-4 text-2xl">❹</span>
									<span>Pink</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-yellow-500 hover:bg-yellow-500/10"
									onClick={() => setTheme("yellow")}>
									<span className="mr-2 h-8 w-4 text-2xl">❺</span>
									<span>Yellow</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
