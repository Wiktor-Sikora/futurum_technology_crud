import {type ReactNode} from "react";

export function SquareButton({children, handleClick, className, buttonType = "button"}: {
    children: ReactNode,
    handleClick?: () => void,
    className?: string
    buttonType?: "button" | "submit" | "reset"
}) {
    return <button onClick={handleClick} type={buttonType}
                   className={className ? className : "bg-slate-900 rounded-lg p-2 w-min hover:scale-110 active:scale-90 duration-100"}>
        {children}
    </button>
}
