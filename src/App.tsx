import {useState} from "react";
import type Campaign from "./types/campaign.ts";
import CampaingList from "./components/campaingList.tsx";

function App() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {name: "dogs", keywords: ["długie", "bure"], bidAmount: 1200, campaignFund: 2000, status: true, town: "Kraków", radius: 10}
    ]);

    return (
        <div className={"mx-auto w-9/10 md:w-2/3 lg:w-2/5 flex flex-col gap-5"}>
            <header>
               <h1 className="text-red-400 text-5xl">Campaigns</h1>
            </header>
            <CampaingList campaigns={campaigns} />
        </div>
    )
}

export default App
