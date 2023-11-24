import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ').trim() + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ').trim() + ' ' + message);
};

const printHelp = () => {
    console.log(dedent`
    ${chalk.bgBlue(' HELP ').trim()}
    -s [CITY] для установки города
    Без параметров - вывод погоды
    -h для вывода помощи
    -t [API_KEY] для установки токена 
    Токен можно взять здесь https://openweathermap.org/
    `);
};

const printWeather = (res, icon) => {
    console.log(dedent`
    ${chalk.bgGreenBright(' WEATHER ')}in city ${res.name}
    ${icon}  - ${res.weather[0].description}
    Temperature: ${res.main.temp} (feel like ${res.main.feels_like})
    Humidity: ${res.main.humidity}
    Speed wind: ${res.wind.speed}
    `);
};

export {printError, printSuccess, printHelp, printWeather};