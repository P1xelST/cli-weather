import https from 'node:https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌥️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '🌨️';
        default:
            break;
    }
}

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('not have token in file');
    }
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    // // url.searchParams.append('q', city)
    // url.searchParams.append('lat', 55.75);
    // url.searchParams.append('lon', 37.61);
    // url.searchParams.append('appid', token);
    // url.searchParams.append('lang ', 'ru');
    // url.searchParams.append('units ', 'metric')
    // https.get(url, (response) => {
    //     let res = '';
    //     response.on('data', (chunk) => {
    //         res += chunk;
    //     });
    //     response.on('end', () => {
    //         console.log(res);
    //     })
    // });
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            // lat: 45.03,
            // lon: 35.37,
            q: city,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    })
    return data;
};

export { getWeather, getIcon};