import "./App.css";
import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TemperatureAndDetails from "./Components/TemperatureAndDetails";
import Forecast from './Components/Forecast';
import { useEffect, useState } from "react";
import getFormatedWeatherData from "./services/WeatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setquery] = useState({ q: "pune" });
  const [units, setunits] = useState("metric");
  const [weather, setweather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current Location'

      toast.info('fetching weather for ' + message)

      await getFormatedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setweather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  const notify = () => toast("Wow so easy!");

  return (
    <div
      className={`mx-auto max-w-screen-md mt-t py-5 px-32 bg-gradient-to-br h--fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setquery={setquery} />
      <Inputs setquery={setquery} units={units} setunits={setunits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />

          <TemperatureAndDetails weather={weather} />
        </div>
      )}

      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
