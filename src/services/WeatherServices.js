import { DateTime } from "luxon";

const API_Key = "57df73bd71bfc0ea3873b7ed2ce17021";
const baseUrl = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,daily,alert&appid=57df73bd71bfc0ea3873b7ed2ce17021

const getWeatherData = (infoType, searchParam) => {
  const url = new URL(baseUrl + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParam, appid: API_Key });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};


const getFormatedWeatherData = async (searchParam) => {
  const formatedCurrentWeather = await getWeatherData(
    "weather",
    searchParam
  ).then(formatCurrentWeather);

  return formatedCurrentWeather;
};

const formatToLocalTime = (
  secs, 
  zone, 
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => 
  `http://openweathermap.org/img/wn/${code}@2x.png`;



export default getFormatedWeatherData;

export {formatToLocalTime, iconUrlFromCode}
