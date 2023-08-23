
interface Irregular {
	word: string;
	pastSimple: string;
	pastParticiple: string;
}
const CardHint = ({
  word,
  pastSimple,
  pastParticiple,
}: Irregular) => {
  return (
		<ul className="w-full flex justify-around flex-wrap">
			<li>{word}</li>
			<li> {pastSimple} </li>
			<li> {pastParticiple} </li>

		</ul>
	);
};

export default CardHint;
