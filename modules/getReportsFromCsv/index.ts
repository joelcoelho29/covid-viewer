import {Reports} from "./entities/report";
import {RawReports} from "./entities/rawReport";
import {mapReports} from "./mapper/mapReports";

import {parse} from "csv-parse";

import path from "path";
import fs from "fs";

export const getReportsFromCsv = (FILE_PATH: string): Promise<Reports> => {

    return new Promise((resolve, reject) => {
        const csvFilePath = path.resolve(__dirname, "../../dailyReports/"+FILE_PATH);

        const headers = ['FIPS','Admin2','Province_State','Country_Region','Last_Update','Lat','Long_',
            'Confirmed','Deaths','Recovered','Active','Combined_Key','Incident_Rate','Case_Fatality_Ratio'];

        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        const castToInt = (column: string | number): boolean => column === 'Confirmed' || column === 'Deaths' || column === 'Active' || column === 'Recovered'

        const castToFloat = (column: string | number): boolean => column === 'Lat' || column === 'Long_'

        parse(fileContent, {
            columns: headers,
            cast: (columnValue, context) => {
                if (castToInt(context.column)) {
                    return parseInt(columnValue, 10) || 0;
                }
                if (castToFloat(context.column)) {
                    return parseFloat(columnValue) || 0;
                }

                return columnValue;
            }
        }, (error, result: RawReports) => {
            if (error) {
                reject(error);
            }

            resolve(mapReports(result))
        });
    });
}

