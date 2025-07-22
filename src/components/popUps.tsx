import {type ReactNode, useCallback} from "react";
import {SquareButton} from "./buttons.tsx";
import type Campaign from "../types/campaign.ts"

function PopUp({children, isOpen, onClose, title}: { children: ReactNode, isOpen: boolean, onClose: () => void, title: React.ReactNode}) {
    const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (isOpen &&
        <div onClick={handleBackdropClick} className={"fixed inset-0 flex items-center justify-center transition-opacity duration-100 backdrop-blur-xl"}>
            <div className={"relative flex flex-col gap-5 p-5 bg-gray-800 rounded-xl text-white w-9/10 md:w-2/3 lg:w-2/5"}>
                <h2 className={"text-2xl"}>{title}</h2>
                {children}
            </div>
        </div>
    )
}

export function DeleteCampaignPopUp({isOpen, campaignName, onDelete, onClose}: {
    isOpen: boolean,
    campaignName: string,
    onDelete: () => void,
    onClose: () => void
}) {
    return <PopUp isOpen={isOpen} onClose={onClose} title={<>Do you really want to delete <strong>{campaignName}</strong>?</>}>
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

export function EditCampaignPopUp({isOpen, campaign, onDelete, onClose}: {
    isOpen: boolean,
    campaign: Campaign,
    onDelete: () => void,
    onClose: () => void
}) {
    return <PopUp isOpen={isOpen} onClose={onClose} title={<>Edit <strong>{campaign.name}</strong>?</>}>
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
