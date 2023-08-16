import ArrowDown from "@/components/icons/ArrowDown";
import Typewriter from "typewriter-effect";
export default function Arrow_down() {
	return (
		<>
			<div className="w-auto h-auto flex flex-col justify-end items-center text-base text-center md:text-2xl p-8 bg-black/40 rounded-full border-2">
				<h2 className="text-sm md:text-2xl">Working in progress...</h2>
				<Typewriter
					options={{
						strings: [
							"Next.js",
							"TypeScript",
							"Supabase",
							"React",
							"Tailwind CSS",
							"HTML5",
							"CSS3",
						],
						autoStart: true,
						loop: true,
					}}
				/>
				<div className="absolute -bottom-2 w-14 h-14 md:w-20 md:h-20  flex justify-center items-end animate-ping-slow border-2">
					<ArrowDown />
				</div>
			</div>
		</>
	);
}
