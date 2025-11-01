const styles = {
	button__cover:
		"flex flex-col items-center justify-center rounded w-[90px] font-extrabold  opacity-100 cursor-pointer __button_color  text-main-secondary py-0",
	span: "text-[12px]",
};

type ButtonProps = {
	onClick?: () => void;
	description?: string;
	children?: React.ReactNode;
};
export default function Button({ onClick, description, children }: ButtonProps) {
	return (
		<div className={styles.button__cover} onClick={onClick}>
			<span  className={styles.span}>{description}</span>
			{children}
		</div>
	);
}
