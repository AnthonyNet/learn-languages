import ArrowDown from "@/components/icons/ArrowDown";
import Typewriter from "typewriter-effect";
export default function Arrow_down() {
	return (

			<div className="flex flex-col justify-around items-center text-base text-center md:text-2xl  rounded-full __hide ">
				<div className="mt-2 sm:mt-8 w-14 h-14 md:w-20 md:h-20  flex justify-end items-end animate-ping-slow">
					<ArrowDown />
				</div>
			</div>

	);
}
