import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import Future from './Future';
import ForecastTable from './ForecastTable';
// 图片资源
import snow from '../assets/snow.webp'
import rain from '../assets/rain.jpg'
import thunder from '../assets/thunderstorm.png'
import cloud from '../assets/cloud.jpg'
import sunny from '../assets/sunny.png'
import sun from '../assets/nosun.jpg'
import bigrain from '../assets/bigrain.jpg'
import cloudy from '../assets/cloudy.webp'

export default function Weather({cityTittle}) {
  const [forecast, setforecast] = useState(null)
  const [wheather, setwheather] = useState(null)
  const [temp, setTemp] = useState(null)
  const [today, setToday] = useState(null)
  const [todayData, setTodayData] = useImmer(timeData)
  const [img, setImg] = useState(null)
  const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityTittle.en}&lang=zh_cn&appid=402eb0c592fce39c64e117445a9737c7&units=metric`
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        //console.log("API 回传数据:", data.list);
        setforecast(data); // 将实际的数据设置到 forecast 状态
        const forecastMap = data.list;
        // 你可能还需要从 forecast 的数据中提取当前天气信息并设置到 wheather 状态
        if (data && forecastMap.length > 0) {
          setwheather(forecastMap[0].weather[0].description); // 最近的预报
          setTemp(Math.round(forecastMap[0].main.temp))
          const today = new Date(forecastMap[0].dt * 1000);// 最新的时间戳
          setToday(today.toLocaleDateString());
          const newHours = today.getHours();

          const iconKey = forecastMap[0].weather[0].icon.slice(0,2)
          console.log(iconKey);
          setImg(weatherId[iconKey])
          setTodayData(draft => {
            let i = 0;
            draft.forEach(data => {
              if (data.hour >= newHours){
                data.value = Math.round(forecastMap[i].main.temp);
                data.pop = Math.round(forecastMap[i].pop * 100);
                data.speed = Math.round(forecastMap[i].wind.speed * 3.6);
                data.icon = forecastMap[i].weather[0].icon
                i++
              } else {
                data.value = '-';
                data.pop = '-';
                data.speed = '-';
              }
            })
          })
        }
      } catch (error) {
        console.error("获取天气数据失败:", error);
      }
    }
    if (cityTittle.en) {
      fetchWeather();
    } else {
      setwheather('');
      setTemp('');
      setTodayData(timeData)
      setforecast(null)
    }
  }, [baseUrl,cityTittle]); // 当 baseUrl 改变时重新执行 Effect (例如，城市改变)
  return (
    <div className="container weather-container">
      <div className="backgroundImg" style={{backgroundImage:`url(${img})`}}></div>
      <div className='wheather-head'>
        <div className="today">{today}</div>
        <h1 className="text-center">{cityTittle.cn}天氣</h1>
        <div className="current-weather">
            <div className="temperature">{temp}°C</div>
            <div className="description">{wheather}</div>
        </div>
        <h2>今日預測</h2>
      </div>
      {(todayData.length > 0) && <ForecastTable dataList={todayData}></ForecastTable>}
      {(Boolean(forecast)) && <Future data={forecast.list} timeData={timeData}></Future>}
  </div>
  );
}
const timeData = [
  { time: '上午 2時', value: '-', hour: 2, pop:'-', speed:'-', icon: '' },
  { time: '上午 5時', value: '-', hour: 5, pop:'-', speed:'-', icon: '' },
  { time: '上午 8時', value: '-', hour: 8, pop:'-', speed:'-', icon: '' },
  { time: '上午 11時', value: '-', hour: 11, pop:'-', speed:'-', icon: '' },
  { time: '下午 2時', value: '-', hour: 14, pop:'-', speed:'-', icon: '' },
  { time: '下午 5時', value: '-', hour: 17, pop:'-', speed:'-', icon: '' },
  { time: '下午 8時', value: '-', hour: 20, pop:'-', speed:'-', icon: '' },
  { time: '下午 11時', value: '-', hour: 23, pop:'-', speed:'-', icon: '' },
];
const weatherId = {
  '01': sun,
  '02': sunny,
  '03': cloud,
  '04': cloudy,
  '09': bigrain,
  '10': rain,
  '11': thunder,
  '13': snow,
  '50': cloud
}
