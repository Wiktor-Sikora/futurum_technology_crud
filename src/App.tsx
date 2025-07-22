import {useState, useCallback, useEffect} from "react";
import type Campaign from "./types/campaign.ts";
import CampaingList from "./components/campaingList.tsx";
import {initialCampaigns} from "./assets/data/data.ts";
import {SquareButton} from "./components/buttons.tsx";
import {EditCampaignPopUp} from "./components/popUps.tsx";
import {v4 as uuidv4} from "uuid";

function App() {
    const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
        const stored = localStorage.getItem('campaigns');
        if (stored && stored !== "[]") {
            try {
                return JSON.parse(stored);
            } catch {
                return initialCampaigns;
            }
        }
        return initialCampaigns;
    });
    const [funds, setFunds] = useState<number>(() => {
        const stored = localStorage.getItem('funds');
        if (stored) return parseFloat(stored);

        // fallback calculation
        const totalSpent = campaigns.reduce((total: number, campaign: Campaign) => {
            return total + (campaign.status ? campaign.campaignFund : 0);
        }, 0);

        return 100000 - totalSpent;
    });
    const [isNewCampaign, setIsNewCampaign] = useState(false)

    useEffect(() => {
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        localStorage.setItem('funds', funds.toString())
    }, [campaigns, funds]);

    const handleToggleStatus = useCallback((id: string) => {
        const nextCampaigns: Campaign[] = campaigns.map((campaign: Campaign) =>
            campaign.id === id ? {...campaign, status: !campaign.status} : campaign
        )
        setCampaigns(nextCampaigns)

        const totalSpent = nextCampaigns.reduce((total: number, campaign: Campaign) => {
            return total + (campaign.status ? campaign.campaignFund : 0);
        }, 0);

        setFunds(100000 - totalSpent)
    }, [setCampaigns, campaigns]);

    const handleSave = useCallback((newCampaign: Campaign) => {
        const nextCampaigns: Campaign[] = [newCampaign, ...campaigns]
        setCampaigns(nextCampaigns)

        const totalSpent = nextCampaigns.reduce((total: number, campaign: Campaign) => {
            return total + (campaign.status ? campaign.campaignFund : 0);
        }, 0);

        setFunds(100000 - totalSpent)
    }, [campaigns])

    const handleEdit = useCallback((editedCampaign: Campaign) => {
        const nextCampaigns: Campaign[] = campaigns.map((campaign: Campaign) =>
            campaign.id === editedCampaign.id ? editedCampaign : campaign
        )
        setCampaigns(nextCampaigns)

        const totalSpent = nextCampaigns.reduce((total: number, campaign: Campaign) => {
            return total + (campaign.status ? campaign.campaignFund : 0);
        }, 0);

        setFunds(100000 - totalSpent)
    }, [setCampaigns, campaigns]);

    const handleDelete = useCallback((id: string) => {
        const nextCampaigns: Campaign[] = campaigns.filter(campaign => campaign.id !== id)
        setCampaigns(nextCampaigns);

        const totalSpent = nextCampaigns.reduce((total: number, campaign: Campaign) => {
            return total + (campaign.status ? campaign.campaignFund : 0);
        }, 0);

        setFunds(100000 - totalSpent)
    }, [setCampaigns, campaigns]);

    return (
        <div className={"mx-auto w-9/10 md:w-2/3 lg:w-2/5 flex flex-col gap-5"}>
            <header className={"flex flex-col gap-3"}>
                <h1 className="text-white text-5xl">Funds: <span
                    className={funds < 0 ? "text-red-600" : ""}>{funds}$</span></h1>
                <div className={"flex flex-row justify-between"}>
                    <h1 className="text-red-400 text-5xl">Campaigns</h1>
                    <SquareButton handleClick={() => {
                        setIsNewCampaign(true)
                    }}
                                  className={"bg-red-400 text-white font-bold rounded-lg p-2 hover:scale-110 active:scale-90 duration-100"}>Add <span
                        className={"font-extrabold"}>+</span></SquareButton>
                </div>
            </header>
            <CampaingList campaigns={campaigns} onToggleStatus={handleToggleStatus} onEdit={handleEdit}
                          onDelete={handleDelete}/>

            {isNewCampaign &&
                <EditCampaignPopUp isOpen={true} campaign={{id: uuidv4(), name: "", campaignFund: 500, bidAmount: 100, status: true, radius: 5, keywords: []}} onSave={(campaign: Campaign) => {
                    {handleSave(campaign); setIsNewCampaign(false)}
                }} onClose={() => setIsNewCampaign(false)} />
            }
    </div>)
}

export default App
