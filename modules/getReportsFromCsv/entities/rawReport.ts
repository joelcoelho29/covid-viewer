export type RawReport = {
    FIPS: string;
    Admin2: string;
    Province_State: string;
    Country_Region: string;
    Last_Update: string;
    Lat: number;
    Long_: number;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Combined_Key: string;
    Incident_Rate: string;
    Case_Fatality_Ratio:  string
};

export type RawReports = RawReport[]