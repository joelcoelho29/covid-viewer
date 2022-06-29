import {Reports} from "../entities/report";
import {RawReports} from "../entities/rawReport";

export const mapReports = (rawReports: RawReports): Reports => {
    return rawReports.map(item => {
        return {
            country: item.Country_Region,
            active: item.Active,
            combinedKey: item.Combined_Key,
            confirmed: item.Confirmed,
            deaths: item.Deaths,
            fatalityRatio: item.Case_Fatality_Ratio,
            incidentRate: item.Incident_Rate,
            lat: item.Lat,
            long: item.Long_,
            lastUpdate: item.Last_Update,
            recovered: item.Recovered
        }
    })
}