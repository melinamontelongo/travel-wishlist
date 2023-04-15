export const Button = (props) => {
    return(
        <button type={props.type} onClick={props.handleOnClick} className="font-['Cutive_Mono'] text-xl bg-orange-400 p-1 md:p-1.5 mx-2 shadow-lg hover:bg-orange-500 hover:shadow-orange-500/50 transition-colors rounded">
            {props.children}
        </button>
    );
};