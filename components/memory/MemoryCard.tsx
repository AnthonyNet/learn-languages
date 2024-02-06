"use client";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Card {
	id: number;
	item: {
		select: number;
		check: boolean;
		cz?: string;
		eng?: string;
		click: boolean;
	};
	handleClick: (id: number, select: number) => void;
}

export default function MemoryCard({ id, item, handleClick }: Card) {
	return (
		<motion.button
			className={clsx(
				"relative flex items-center justify-center  cursor-pointer group perspective transition ease-in-out duration-500   __border_hover focus:border-border_active ",
				{
					"border-2 rounded-3xl p-4 border-b __memory_border_green": item.click,
					"p-4 border-2 rounded-3xl border-primary":
						!item.click || (item.click && item.check),
					"opacity-0 transition-opacity duration-1000 delay-1000 ease-in-out":
						item.check,
				}
			)}
			onClick={() => handleClick(id, item.select)}
			disabled={item.click}>
			<motion.div
				className="preserve-3d group my-rotate-y-180 w-full h-full "
				animate={{ rotateY: item.check ? 180 : 0 }}
				transition={{ duration: 0.5 }}>
				<motion.div className="w-full h-full flex items-center justify-center">
					<h2 className="text-base font-bold md:text-xl  p-2 sm:p-0">
						{item.cz ? item.cz : item.eng}
					</h2>
				</motion.div>
				<motion.div className="absolute top-0 my-rotate-y-180 backface-hidden overflow-hidden rounded-3xl w-full h-full bg-primary-background">
					<div className="w-full h-full flex flex-col items-center justify-center">
						<h3 className="text-4xl xl:text-6xl">👍</h3>
					</div>
				</motion.div>
			</motion.div>
		</motion.button>
	);
}
