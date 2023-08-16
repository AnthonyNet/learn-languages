import ArrowDown from "@/components/icons/ArrowDown";
import Typewriter from "typewriter-effect";
export default function Arrow_down() {
	return (

			<div className="w-auto h-auto flex flex-col justify-around items-center text-base text-center md:text-2xl  rounded-full __hide">
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
				<div className="mt-2 sm:mt-8 w-14 h-14 md:w-20 md:h-20  flex justify-end items-end animate-ping-slow">
					<ArrowDown />
				</div>
			</div>

	);
}
