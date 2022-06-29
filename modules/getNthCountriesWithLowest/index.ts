import {Reports} from "../getReportsFromCsv/entities/report";

type Attributes = "active" | "confirmed" | "recovered" | "deaths"

export const getNthCountriesWithLowest = (reports: Reports,
                                                    attribute: Attributes,
                                                    n: number): Reports => {

    if (n > reports.length) return [];
    if (n == reports.length) return reports;

    return [...reports].sort((a, b) => a[attribute] - b[attribute]).slice(0, n)
}