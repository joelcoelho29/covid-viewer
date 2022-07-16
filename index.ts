import {getReportsFromCsv} from "./modules/getReportsFromCsv";
import {getNthCountriesWithHighestAttributeValue} from "./modules/getNthCountriesWithHighest";
import {getNthCountriesWithLowestAttributeValue} from "./modules/getNthCountriesWithLowest";
import {getHemisphere, Hemisphere} from "./modules/getHemisphere";
import {filterByConfirmed} from "./modules/filterByConfirmed";
import * as readline from "readline";
import fs from 'fs'
import path from "path";

const sys = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

fs.readdir(path.join(__dirname, "dailyReports"), (err, files) => {
    if (!err) files.forEach((file, i) => console.log(i+1,")", file))
})

sys.question("========== Digite um reporte diário disponível ==========\n", (FILE_NAME) => {

    getReportsFromCsv(FILE_NAME).then(reports => {

        console.log("1) Três países com maiores valores de 'Confirmed' ordenados alfabeticamente:");
        getNthCountriesWithHighestAttributeValue(reports, "confirmed", 3)
            .sort((a, b) => a.country.localeCompare(b.country))
            .forEach(report => console.log(report.country, report.confirmed));

        console.log("\n2) Dentre os dez países com maiores valores de 'Active', a soma dos 'Deaths' dos cinco países com menores valores de 'Confirmed':");
        console.log(getNthCountriesWithLowestAttributeValue(
            getNthCountriesWithHighestAttributeValue(reports, "active", 10), "confirmed", 5)
            .reduce((p, c) => p + c.deaths, 0));

        console.log("\n3) O maior valor de 'Deaths' entre os países do hemisfério sul:");
        console.log(getNthCountriesWithHighestAttributeValue(getHemisphere(reports, Hemisphere.SOUTH), "deaths", 1)[0].deaths);

        console.log("\n4) O maior valor de 'Deaths' entre os países do hemisfério norte:");
        console.log(getNthCountriesWithHighestAttributeValue(getHemisphere(reports), "deaths", 1)[0].deaths);

        console.log("\n5) A soma de 'Active' de todos os países em que 'Confirmed' é maior o igual que 1.000.000:");
        console.log(filterByConfirmed(reports, 1000000).reduce((p, c) => p + c.active, 0));

    }).catch(console.error);

    sys.close();
})
