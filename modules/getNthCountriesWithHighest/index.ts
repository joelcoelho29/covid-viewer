import {Reports} from "../getReportsFromCsv/entities/report";

type Attributes = "active" | "confirmed" | "recovered" | "deaths"

export const getNthCountriesWithHighestAttributeValue = (reports: Reports,
                                                         attribute: Attributes,
                                                         n: number): Reports => {

    if (n > reports.length) return [];
    if (n == reports.length) return reports;

    return [...reports].sort((a, b) => b[attribute] - a[attribute]).slice(0, n)
}