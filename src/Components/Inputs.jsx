import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';


function Inputs({ setquery, units, setunits }) {
  const [city, setcity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') {
      setquery({ q: city })
    }
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching User Location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location Fetched")
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setquery({ lat, lon });
      })
    }
  }

  const handleunitschange = (e) => {
    const seletedunits = e.currentTarget.name;

    if(units !== seletedunits) setunits(seletedunits);
  }

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex fex-row w-3/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setcity(e.currentTarget.value)}
          type="text"
          className='text-xl font-light p-2 w-full shadow-xl focus outline-none capitalize placeholder:lowercase'
          placeholder='Search for city....'
        />
        <UilSearch size={25} onClick={handleSearchClick} className="text-white cursor-pointer transition ease-out hover:scale-125" />
        <UilLocationPoint size={25} onClick={handleLocationClick} className="text-white cursor-pointer transition ease-out hover:scale-125" />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          className='text-xl text-white font-light hover:scale-125 transition ease-out'
          onClick={handleunitschange}>
          °C
        </button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-xl text-white font-light hover:scale-125 transition ease-out' onClick={handleunitschange}>°F</button>
      </div>
    </div>
  )
}

export default Inputs
