import {
    type ReactNode,
    useCallback,
    useState,
    useEffect,
    type FormEvent,
    type MouseEvent
} from "react";
import {SquareButton} from "./buttons.tsx";
import type Campaign from "../types/campaign.ts"
import {SelectInput, TextInput, NumberInput, TagInput} from "./inputs.tsx";
import {keywordsSuggestions, towns} from "../assets/data/data.ts"

function PopUp({children, isOpen, onClose, title}: {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void,
    title: ReactNode
}) {
    const handleBackdropClick = useCallback((e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (isOpen &&
        <div onClick={handleBackdropClick}
             className={"fixed inset-0 flex items-center justify-center transition-opacity duration-100 backdrop-blur-xl"}>
            <div
                className={"relative flex flex-col gap-5 p-5 bg-gray-800 rounded-lg text-white w-9/10 md:w-2/3 lg:w-2/5"}>
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
    return <PopUp isOpen={isOpen} onClose={onClose}
                  title={<>Do you really want to delete <strong>{campaignName}</strong>?</>}>
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

export function EditCampaignPopUp({isOpen, campaign, onSave, onClose}: {
    isOpen: boolean,
    campaign: Campaign,
    onSave: (campaign: Campaign) => void,
    onClose: () => void
}) {

    const [formState, setFormState] = useState({
        id: campaign.id,
        name: campaign.name,
        keywords: campaign.keywords,
        bidAmount: campaign.bidAmount,
        campaignFund: campaign.campaignFund,
        status: campaign.status,
        town: campaign.town ?? "",
        radius: campaign.radius
    });

    const [formErrorMessage, setFormErrorMessage] = useState("")

    useEffect(() => {
        setFormState({
            id: campaign.id,
            name: campaign.name,
            keywords: campaign.keywords,
            bidAmount: campaign.bidAmount,
            campaignFund: campaign.campaignFund,
            status: campaign.status,
            town: campaign.town ?? "",
            radius: campaign.radius
        });
    }, [campaign]);

    const handleChange = (
        value: string | number | string[],
        field: keyof typeof formState
    ) => {

        setFormState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formState.name.trim()) {
            setFormErrorMessage("Campaign name is not valid"); return
        } else if (!formState.bidAmount || formState.bidAmount < 100) {
            setFormErrorMessage("Bid Amount must be at least 100$"); return
        } else if (!formState.campaignFund || formState.campaignFund <= 0) {
            setFormErrorMessage("Campaign fund must be a positive number"); return
        } else if (!formState.radius || formState.radius <= 0) {
            setFormErrorMessage("Campaign radius must be a positive number"); return
        } else if (formState.keywords.length == 0) {
            setFormErrorMessage("At least one keyword is required"); return
        }

        const updatedCampaign: Campaign = {
            id: formState.id,
            name: formState.name.trim(),
            keywords: formState.keywords,
            bidAmount: formState.bidAmount,
            campaignFund: formState.campaignFund,
            status: formState.status,
            town: formState.town.trim() || undefined,
            radius: formState.radius
        };

        onSave(updatedCampaign);
    }

    return <PopUp isOpen={isOpen} onClose={onClose} title={<>Editing campaign <strong>{campaign.name}</strong></>}>
        <form onSubmit={handleSubmit} className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <TextInput onChange={(event) => handleChange(event.target.value, "name")} name={"name"}
                       label={"Campaign name"}
                       value={formState.name} placeholderValue={"dog hairdresser"} isRequired={true}/>
            <SelectInput name={"town"} label={"Campaign town"} value={formState.town} options={towns}
                         onChange={(event) => handleChange(event.target.value, "town")}
                         isRequired={true}/>
            <NumberInput name={"radius"} label={"Campaign radius (km)"} value={formState.radius} isRequired={true}
                         onChange={(event) => handleChange(parseFloat(event.target.value), "radius")}/>
            <NumberInput name={"bidAmount"} label={"Bid amount (min 100$)"} value={formState.bidAmount} isRequired={true}
                         minValue={100}
                         onChange={(event) => handleChange(parseFloat(event.target.value), "bidAmount")}/>
            <NumberInput name={"campaignFund"} label={"Fund amount"} value={formState.campaignFund}
                         isRequired={true}
                         onChange={(event) => handleChange(parseFloat(event.target.value), "campaignFund")}/>
            <TagInput name={"keywords"} label={"Campaign Keywords"} currentTags={formState.keywords}
                      tagSuggestions={keywordsSuggestions} className={"col-span-full"}
                      onChange={(tags: string[]) => handleChange(tags, "keywords")}/>

            {formErrorMessage && <p className={"text-red-600 col-span-full"}>{formErrorMessage}</p>}

            <div className={"flex flex-row col-span-full gap-5"}>
                <SquareButton buttonType={"submit"} handleClick={(e: FormEvent) => handleSubmit(e)}>
                    <p>Save</p>
                </SquareButton>
                <SquareButton handleClick={onClose}>
                    <p>Cancel</p>
                </SquareButton>
            </div>


        </form>
    </PopUp>;
}
