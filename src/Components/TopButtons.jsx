import React from 'react'

function TopButtons({setquery}) {
  const cities = [
    {
      id: 1,
      title: "Delhi"
    },
    {
      id: 2,
      title: "Mumbai"
    },
    {
      id: 3,
      title: "Pune"
    },
    {
      id: 4,
      title: "Jaipur"
    },
    {
      id: 5,
      title: "London"
    }
  ]

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className='text-white text-lg font-medium' onClick={() => setquery({q: city.title})}>{city.title}</button>
      ))}
    </div>
  )
}

export default TopButtons
