interface Props {
	setMyNumb: (numb: number) => void;
	setCurrentPage: (numb: number) => void;
	myNumb: number;
}

const styles = {
	nav: " w-full h-auto mt-[70px]",
	ul: "flex flex-row justify-around sm:w-[400px] m-auto flex-wrap border-y-2 __border_color",
	li__active: "border-b-4 border-red-600",
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
					className={myNumb === 0 ? styles.li__active : ""}
					onClick={() => handleClick(0)}>
					Phrasal verbs
				</li>
				<li
					className={myNumb === 1 ? styles.li__active : ""}
					onClick={() => handleClick(1)}>
					Oxford B2
				</li>

			</ul>
		</nav>
	);
}
