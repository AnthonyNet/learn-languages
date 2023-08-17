import Image from "next/image";
import engFlag from "@/images/eng-flag.png";
import gerFlag from "@/images/ger-flag.png";

export default function Flying_objects() {
	return (
		<div>
			<span className="w-[40vw] md:w-[60vw] lg:w-[40vw] z-[-1] absolute top-1/2 left-1/2 __logo-icon-container animate-orbit   transform origin-[80%] [50%] ">
				<span className="logo-icon opacity-30">
					<Image
						src={engFlag}
						alt="Picture of the earth"
						sizes=" 10vw sm:70vw"
						loading="lazy"
						className="w-[25vw] md:w-[30vw] lg:w-[12vw] aspect-square"
					/>
				</span>
			</span>
			<span className="-mt-40 -ml-[30vw] w-[40vw] md:w-[30vw] z-[-1] absolute top-1/2 left-1/2 __logo-icon-container animate-orbit-reverse  transform origin-[80%] [50%]">
				<span className="logo-icon opacity-30">
					<Image
						src={gerFlag}
						alt="Picture of the earth"
						sizes="70vw"
						loading="lazy"
						className="w-[70vw] md:w-[40vw] lg:w-[20vw] 2xl:w-[15vw]"
					/>
				</span>
			</span>
		</div>
	);
}
