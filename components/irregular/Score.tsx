import { BsFillStarFill } from "react-icons/bs";
interface Score {
	readonly score: number;
}

const Score = ({ score }: Score) => {
	const iterateStars = (score: number) => {
		let stars = [];
		for (let i = 0; i < score; i++) {
			stars.push(<BsFillStarFill key={i} />);
		}
		return stars;
	};

	return (
		<div className="w-full flex  justify-center items-center h-8  px-6  border-y-4 border-double text-yellow-400 starsDiv  border-main">
			{/*runMe(score)*/}
			{iterateStars(score)}
		</div>
	);
};

export default Score;
