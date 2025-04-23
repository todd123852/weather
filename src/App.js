import Select from "./components/Select";
import Weather from "./components/Weather";
import { useState } from "react";
export default function App() {
  const [city, setCity] = useState('')
  function handleCitySelected(newCity) {
    setCity(newCity)
  }
  return (
    <div>
      <Select onCityChange={handleCitySelected}></Select>
      <Weather cityTittle={city}></Weather>
    </div>
  );
}

