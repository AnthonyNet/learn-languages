const styles = {
    button__cover:
        "flex flex-col items-center justify-center rounded w-[90px] font-extrabold  opacity-100 cursor-pointer __button_color  text-main-secondary py-0",
    span: "text-[12px]",
};

export default function Button(props: any) {
    return (
        <div className={styles.button__cover} onClick={props.onClick}>
            <span  className={styles.span}>Text</span>
            {props.children}
        </div>
    );
}
