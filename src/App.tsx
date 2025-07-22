import {useState, useCallback} from "react";
import type Campaign from "./types/campaign.ts";
import CampaingList from "./components/campaingList.tsx";
import {v4 as uuidv4} from "uuid";

function App() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {id:uuidv4(), name: "dogs", keywords: ["white", "fluffy", "cute"], bidAmount: 1200, campaignFund: 2000, status: true, town: "Kraków", radius: 10},
        {id: uuidv4(), name: "tech gadgets", keywords: ["tech", "smartphone", "AI"], bidAmount: 1500, campaignFund: 10000, status: false, town: "Gdańsk", radius: 20},
        {id: uuidv4(), name: "eco living", keywords: ["green", "sustainable", "eco"], bidAmount: 600, campaignFund: 3500, status: true, town: "Wrocław", radius: 8},
        {id: uuidv4(), name: "pet toys", keywords: ["pets", "toys", "fun"], bidAmount: 900, campaignFund: 2200, status: true, town: "Poznań", radius: 12},
        {id: uuidv4(), name: "fitness gear", keywords: ["fitness", "workout", "gym"], bidAmount: 1300, campaignFund: 7500, status: false, town: "Łódź", radius: 18 }
    ]);

    const handleToggleStatus = useCallback((id: string) => {
        setCampaigns(campaigns => campaigns.map((campaign: Campaign) =>
            campaign.id === id ? { ...campaign, status: !campaign.status } : campaign
        ))
    }, [setCampaigns]);

    const handleEdit = useCallback((editedCampaign: Campaign) => {
        setCampaigns(campaigns => campaigns.map((campaign: Campaign) =>
            campaign.id === editedCampaign.id ? editedCampaign : campaign
        ))
    }, [setCampaigns]);

    const handleDelete = useCallback((id: string) => {
        setCampaigns(campaigns => campaigns.filter(campaign => campaign.id !== id));
    }, []);

    return (
        <div className={"mx-auto w-9/10 md:w-2/3 lg:w-2/5 flex flex-col gap-5"}>
            <header>
               <h1 className="text-red-400 text-5xl">Campaigns</h1>
            </header>
            <CampaingList campaigns={campaigns} onToggleStatus={handleToggleStatus} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default App
