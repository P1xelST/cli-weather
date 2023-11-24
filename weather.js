#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('no have tonek')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('- token save');
    } catch(e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('no have city')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('- city save');
    } catch(e) {
        printError(e.message)
    }
}

const getForcats = async (city) => {
    try {
        const citys = city ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(citys);
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch(e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        }
        if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}
// KiraTiTop
const initCLI = function() {
    const args = getArgs(process.argv)
    console.log(args);
    if (args.h) {
        // output help
        return printHelp();
    }
    if (args.s) {
        // save city\
        return saveCity(args.s);
    }
    if (args.t) {
        // save token
        return saveToken(args.t);
    }
    // output weather
    // getForcats();
    return getForcats(process.env.CITY);
};

initCLI();