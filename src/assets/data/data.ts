import type {Tag} from "react-tag-input"
import type Campaign from "../../types/campaign.ts";
import {v4 as uuidv4} from "uuid";

export const towns: string[] = [
    "Kraków",
    "Warszawa",
    "Gdańsk",
    "Poznań",
    "Wrocław",
    "Łódź",
    "Szczecin",
    "Katowice",
    "Lublin",
    "Bydgoszcz",
    "Białystok",
    "Rzeszów",
    "Częstochowa",
    "Gdynia",
    "Radom"
]

export const keywordsSuggestions: Tag[] = [
    {id: "Summer Sale", text: "Summer Sale", className: "bg-gray-100"},
    {id: "Holiday Deals", text: "Holiday Deals", className: "bg-gray-100"},
    {id: "Flash Offer", text: "Flash Offer", className: "bg-gray-100"},
    {id: "Back-to-School", text: "Back-to-School", className: "bg-gray-100"},
    {id: "New Arrival", text: "New Arrival", className: "bg-gray-100"},
    {id: "Limited Time", text: "Limited Time", className: "bg-gray-100"},
    {id: "Weekend Promo", text: "Weekend Promo", className: "bg-gray-100"},
    {id: "Winter Clearance", text: "Winter Clearance", className: "bg-gray-100"},
    {id: "Free Shipping", text: "Free Shipping", className: "bg-gray-100"},
    {id: "VIP Access", text: "VIP Access", className: "bg-gray-100"},
    {id: "Exclusive Drop", text: "Exclusive Drop", className: "bg-gray-100"},
    {id: "Hot Picks", text: "Hot Picks", className: "bg-gray-100"},
    {id: "Spring Launch", text: "Spring Launch", className: "bg-gray-100"},
    {id: "Early Access", text: "Early Access", className: "bg-gray-100"},
    {id: "Daily Deal", text: "Daily Deal", className: "bg-gray-100"},
    {id: "Bundle Offer", text: "Bundle Offer", className: "bg-gray-100"},
    {id: "Mega Discount", text: "Mega Discount", className: "bg-gray-100"},
    {id: "Black Friday", text: "Black Friday", className: "bg-gray-100"},
    {id: "Cyber Monday", text: "Cyber Monday", className: "bg-gray-100"},
];

export const initialCampaigns: Campaign[] = [
    {
        id: uuidv4(),
        name: "dogs",
        keywords: ["white", "fluffy", "cute"],
        bidAmount: 1200,
        campaignFund: 2000,
        status: true,
        town: "Kraków",
        radius: 10
    },
    {
        id: uuidv4(),
        name: "tech gadgets",
        keywords: ["tech", "smartphone", "AI"],
        bidAmount: 1500,
        campaignFund: 10000,
        status: false,
        town: "Gdańsk",
        radius: 20
    },
    {
        id: uuidv4(),
        name: "eco living",
        keywords: ["green", "sustainable", "eco"],
        bidAmount: 600,
        campaignFund: 3500,
        status: true,
        town: "Wrocław",
        radius: 8
    },
    {
        id: uuidv4(),
        name: "pet toys",
        keywords: ["pets", "toys", "fun"],
        bidAmount: 900,
        campaignFund: 2200,
        status: true,
        town: "Poznań",
        radius: 12
    },
    {
        id: uuidv4(),
        name: "fitness gear",
        keywords: ["fitness", "workout", "gym"],
        bidAmount: 1300,
        campaignFund: 7500,
        status: false,
        town: "Łódź",
        radius: 18
    }
]