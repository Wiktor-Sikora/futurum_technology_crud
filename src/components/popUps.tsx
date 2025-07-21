import {type ReactNode} from "react";
import {createPortal} from 'react-dom';
import {SquareButton} from "./buttons.tsx";

function PopUp({children, isOpen, title}: { children: ReactNode, isOpen: boolean, title: string }) {
    const popupRoot = document.getElementById("popup-root");
    if (!isOpen || !popupRoot) return null;

    return createPortal(
        <div className={"fixed inset-0 flex items-center justify-center transition-opacity duration-100 backdrop-blur-xl"}>
            <div className={"relative flex flex-col gap-5 p-5 bg-gray-800 rounded-xl text-white w-9/10 md:w-2/3 lg:w-2/5"}>
                <h2 className={"text-2xl"}>{title}</h2>
                {children}
            </div>
        </div>,
        popupRoot
    )
}

export function DeleteCampaignPopUp({isOpen, campaignName, onDelete, onClose}: {
    isOpen: boolean,
    campaignName: string,
    onDelete: () => void,
    onClose: () => void
}) {
    return <PopUp isOpen={isOpen} title={`Do you really want to delete ${campaignName}?`}>
        <div className={"flex flex-row gap-5"}>
            <SquareButton handleClick={onDelete}>
                <p>Delete</p>
            </SquareButton>
            <SquareButton handleClick={onClose}>
                <p>Cancel</p>
            </SquareButton>
        </div>
    </PopUp>;
}