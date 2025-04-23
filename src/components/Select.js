import { cities } from "./CityName";
import { useState } from "react";
export default function Select({onCityChange}) {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('')
    let cityOption;
    if (country) {
        cityOption = Object.keys(cities[country]) // 英文列表
    } else {
        cityOption = []
    }
    function changeCountry(country) {
        setCountry(country);
        if (country) {
            const firstCity = Object.keys(cities[country])[0];
            setCity(firstCity);
            onCityChange({cn: firstCity, en: cities[country][firstCity]})
        } else {
            setCity('')
            onCityChange('')
        }
    }
    function changeCity(city) {
        setCity(city);
        onCityChange({cn: city, en: cities[country][city]})
    }
    return(
        <div>
            <select onChange={(e) => changeCountry(e.target.value)} value={country}>
                <option value="">请选择城市</option>
                <option value="China">中国</option>
                <option value="Japan">日本</option>
                <option value="Taiwan">台湾</option>
                <option value="Russia">俄罗斯</option>
            </select>
            <select disabled={!country} 
            onChange={(e) => changeCity(e.target.value)}
            value={city}
            >
                {country ? cityOption.map((city) => {
                    return <option key={city} value={city}>{city}</option>
                }) : <option value="">请先选择国家</option>}
            </select>
        </div>
    )
}