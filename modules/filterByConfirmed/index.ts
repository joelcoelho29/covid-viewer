import {Reports} from "../getReportsFromCsv/entities/report";

export const filterByConfirmed = (reports: Reports, n: number): Reports => {
    return [...reports].filter(report => report.confirmed >= n);
}