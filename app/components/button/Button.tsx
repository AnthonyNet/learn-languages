const styles = {
	button__cover:
		"relative rounded  w-[90px] h-14 text-2xl font-extrabold  opacity-100 cursor-pointer __button_color  __text_color2",
};

export default function Button(props:any) {
	return (
		<div className={styles.button__cover} onClick={props.onClick}>
			{props.children}
		</div>
	);

}