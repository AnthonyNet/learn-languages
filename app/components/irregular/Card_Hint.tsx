
interface Irregular {
	base: string;
	pastSimple: string;
	pastParticiple: string;
}
const CardHint = ({
  base,
  pastSimple,
  pastParticiple,
}: Irregular) => {
  return (
		<ul className="w-full flex justify-around flex-wrap">
			<li>{base}</li>
			<li> {pastSimple} </li>
			<li> {pastParticiple} </li>

		</ul>
	);
};

export default CardHint;
