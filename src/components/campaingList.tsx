import type Campaign from "../types/campaign.ts";
import {MdModeEditOutline, MdDelete, MdCheck,} from "react-icons/md";
import {FaXmark} from "react-icons/fa6";
import {SquareButton} from "./buttons.tsx";
import {useState} from "react";
import {DeleteCampaignPopUp, EditCampaignPopUp} from "./popUps.tsx";

export default function campaignList({campaigns, onToggleStatus, onEdit, onDelete}: {
    campaigns: Campaign[],
    onToggleStatus: (id: string) => void
    onEdit: (campaign: Campaign) => void;
    onDelete: (id: string) => void
}) {

    const [editCampaignId, setEditCampaignId] = useState<string | null>(null);
    const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null);

    return (<div className={"flex flex-col gap-5"}>
            {campaigns.map((option: Campaign) => (
                <article key={option.id}
                         className={`rounded-lg p-5 flex flex-col duration-100 gap-5 ${option.status ? "bg-gray-800 text-white" : "bg-gray-900 text-gray-600"}`}>
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-col gap-2">
                            <h3 className={"text-3xl font-bold"}>{option.name}</h3>
                            <p className={"text-md text-gray-400"}>{option.town && <>{option.town} • </>}{option.radius} km</p>
                            <div className={"flex flex-row gap-3"}>
                                <SquareButton handleClick={() => onToggleStatus(option.id)}>
                                    {option.status ? <MdCheck/> : <FaXmark/>}
                                </SquareButton>
                                <SquareButton handleClick={() => setEditCampaignId(option.id)}>
                                    <MdModeEditOutline/>
                                </SquareButton>
                                <SquareButton handleClick={() => setDeleteCampaignId(option.id)}>
                                    <MdDelete/>
                                </SquareButton>
                            </div>
                        </div>
                        <div className="flex flex-col ml-auto gap-3">
                            <p className={"text-lg"}>Bid: <strong>{option.bidAmount}$</strong></p>
                            <p className={"text-lg"}>Fund: <strong>{option.campaignFund}$</strong></p>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-3">
                        {option.keywords.map((keyword, index) => (
                            <div key={index} className={"bg-slate-900 rounded-lg py-1 px-2"}>{keyword}</div>
                        ))}
                    </div>
                </article>
            ))}

            {deleteCampaignId && (
                <DeleteCampaignPopUp
                    isOpen={true}
                    campaignName={campaigns.find(c => c.id === deleteCampaignId)?.name || 'this campaign'}
                    onDelete={() => {
                        onDelete(deleteCampaignId);
                        setDeleteCampaignId(null);
                    }}
                    onClose={() => setDeleteCampaignId(null)}
                />
            )}

            {editCampaignId && (
                <EditCampaignPopUp
                    isOpen={true}
                    campaign={campaigns.find(c => c.id === editCampaignId) || 'this campaign'}
                    onDelete={() => {
                        onDelete(editCampaignId);
                        setEditCampaignId(null);
                    }}
                    onClose={() => setEditCampaignId(null)}
                />
            )}
        </div>
    )
};