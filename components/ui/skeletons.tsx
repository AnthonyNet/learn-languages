const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] __shimmer";

export function IrregularSkeleton() {
	return (
		<div className="w-full h-full md:h-auto md:w-auto min-w-[350px] flex flex-col justify-center items-center md:border-4 border-double __border_color rounded-[50px] text-center">
			<div className="mt-[25px] md:text-[140%] lg:text-[100%]  h-full  md:h-auto flex flex-col justify-center items-center">
				<div className="relative overflow-hidden m-2 h-6 rounded-xl border-2 w-full __border_color opacity-50">
					<span className={shimmer}> </span>
				</div>
				<div className="relative overflow-hidden m-2 h-6 rounded-xl border-2 w-full __border_color opacity-50">
					<span className={shimmer}> </span>
				</div>
				<div className="relative overflow-hidden rounded-xl h-8 border-2 opacity-50 __border_color w-full">
					<span className={shimmer + " h-full __background"}> </span>
				</div>
				<h5 className="text-3xl px-6 py-3 m-auto">Loading...</h5>
				<ul className="relative overflow-hidden flex flex-col justify-around text-center mb-2 opacity-50">
					<li
						className={
							shimmer +
							" relative overflow-hidden m-1 p-1 border-2 rounded-xl __border_color"
						}>
						<label>
							<input type="text" className="rounded-md p-1 bg-transparent" />
						</label>
					</li>
					<li
						className={
							shimmer +
							" relative overflow-hidden m-1 p-1 border-2 rounded-xl __border_color"
						}>
						<label>
							<input type="text" className="rounded-md p-1 bg-transparent" />
						</label>
					</li>
					<li
						className={
							shimmer +
							" relative overflow-hidden m-1 p-1 border-2 rounded-xl __border_color"
						}>
						<label>
							<input type="text" className="rounded-md p-1 bg-transparent" />
						</label>
					</li>
				</ul>
				<IrregularButtonsSkeleton />
			</div>
		</div>
	);
}

export function IrregularButtonsSkeleton() {
	return (
		<div className="flex w-full flex-row justify-between mt-6 mb-2">
			<button
				type="button"
				className={
					shimmer +
					" relative w-24 h-14 overflow-hidden border-2 opacity-50 rounded-xl __border_color"
				}>
				{" "}
			</button>
			<button
				type="button"
				className={
					shimmer +
					" relative w-24 h-14 overflow-hidden border-2 opacity-50 rounded-xl __border_color"
				}>
				{" "}
			</button>
		</div>
	);
}
