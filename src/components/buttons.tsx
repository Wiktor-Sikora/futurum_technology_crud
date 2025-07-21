import {type ReactNode} from "react";

export function SquareButton({children, handleClick}: {children: ReactNode, handleClick: () => void}) {
    return <button onClick={handleClick} className={"bg-slate-900 rounded-lg p-2 w-min hover:scale-110 active:scale-90 duration-100"}>
        {children}
    </button>
}

