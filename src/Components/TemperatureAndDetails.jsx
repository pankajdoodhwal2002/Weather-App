import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset, } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherServices';

function TemperatureAndDetails(props) {
  console.log(props.weather);

  const data = props.weather;

  return (

    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{data.details}</p>
      </div>
      <div className='flex flex-row items-center justify-between text-white py-3'>
        <img src={iconUrlFromCode(data.icon)} alt="" className='w-20' />
        <p className='text-5xl'>{data.temp.toFixed()}°</p>
        <div className='flex flex-col space-y-2'>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperature size={18} className="mr-1" />
            real fell:
            <span className='font-medium ml-1'>{data.feels_like}°</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className='font-medium ml-1'>{data.humidity}%</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className='font-medium ml-1'>{data.speed}km/h</span>
          </div>


        </div>
      </div>

      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light'>Rise: <span className='font-medium ml-1'>{formatToLocalTime(data.sunrise, data.timezone, "hh:mm a")}</span></p>
        <p className='font-light'>|</p>

        <UilSunset />
        <p className='font-light'>Set: <span className='font-medium ml-1'>{formatToLocalTime(data.sunset, data.timezone, "hh:mm a")}</span></p>
        <p className='font-light'>|</p>

        <UilArrowUp />
        <p className='font-light'>High: <span className='font-medium ml-1'>{data.temp_min.toFixed()}°</span></p>
        <p className='font-light'>|</p>

        <UilArrowDown />
        <p className='font-light'>Low: <span className='font-medium ml-1'>{data.temp_min.toFixed()}°</span></p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails
