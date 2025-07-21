export default interface Campaign {
    name: string;
    keywords: string[];
    bidAmount: number;
    campaignFund: number;
    status: boolean;
    town?: string;
    radius: number;
}