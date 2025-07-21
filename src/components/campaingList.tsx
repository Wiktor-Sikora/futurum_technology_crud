import type Campaign from "../types/campaign.ts";

export default function campaignList({campaigns: campaigns}: { campaigns: Campaign[] }) {

    return (<div>
        {campaigns.map((option: Campaign) => (
            <article className="bg-gray-800 rounded-lg p-5 flex flex-col gap-5 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h3 className={"text-3xl font-bold"}>{option.name}</h3>
                        <p className={"text-md text-gray-400"}>{option.town && <>{option.town} • </>}{option.radius} km</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className={"text-lg"}>Bid: <strong>{option.bidAmount}$</strong></p>
                        <p className={"text-lg"}>Fund: <strong>{option.campaignFund}$</strong></p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-3">
                    {option.keywords.map(keyword => (
                        <div key={keyword} className={"bg-slate-900 rounded-lg py-1 px-2"}>{keyword}</div>
                    ))}
                </div>

            </article>
        ))}
    </div>)
};