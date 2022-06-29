import {Reports} from "../getReportsFromCsv/entities/report";

export enum Hemisphere {
    NORTH,
    SOUTH
}

export const getHemisphere = (reports: Reports, hemisphere: Hemisphere = Hemisphere.NORTH): Reports => {
    if (north(hemisphere)) return [...reports].filter(report => report.lat > 0);
    return [...reports].filter(report => report.lat < 0)
}

const north = (hemisphere: Hemisphere): boolean => hemisphere == Hemisphere.NORTH