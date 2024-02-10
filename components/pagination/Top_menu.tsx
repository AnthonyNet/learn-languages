interface Props {
	setMyNumb: (numb: number) => void;
	setCurrentPage: (numb: number) => void;
	myNumb: number;
}

const styles = {
	nav: " w-full h-auto",
	ul: "flex flex-row justify-around sm:w-[400px] m-auto flex-wrap border-y-2 border-main",
	li__active: "border-b-2 border-main __box_shadow_color",
};

export default function Top_Menu({ myNumb, setMyNumb, setCurrentPage }: Props) {
	const handleClick = (numb: number) => {
		setMyNumb(numb);
		setCurrentPage(1);
	};

	return (
		<nav className={styles.nav}>
			<ul className={styles.ul}>
				<li
					className={myNumb === 0 ? styles.li__active : "cursor-pointer"}
					onClick={() => handleClick(0)}>
					Phrasal verbs
				</li>
				<li
					className={myNumb === 1 ? styles.li__active : "cursor-pointer"}
					onClick={() => handleClick(1)}>
					Oxford B2
				</li>
			</ul>
		</nav>
	);
}
