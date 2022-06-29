export type Report = {
    country: string;
    lastUpdate: string;
    lat: number;
    long: number;
    confirmed: number;
    deaths: number;
    recovered: number;
    active: number;
    combinedKey: string;
    incidentRate: string;
    fatalityRatio: string;
};

export type Reports = Report[]