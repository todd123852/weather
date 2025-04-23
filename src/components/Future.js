import { useImmer } from 'use-immer';
import { useState } from 'react';
import ForecastTable from './ForecastTable';
export default function Future({data,timeData}) {
    const [selectedDay, setSelectedDay] = useState(-1)
    const maxTemp = []; // 每日最高温
    const minTemp = []; // 每日最低温
    const allDayData = []
    const [thisDayData, setThisDayData] = useImmer(timeData)
    let today,date,hours,weekday,cutIndex
    if (data) {
        today = new Date(data[0].dt * 1000)
        date = today.getDate();
        hours = today.getHours();
        weekday = today.getDay();
        cutIndex = ((24 + 2) - hours) / 3; // 今天全部时间有多少
        for (let i = cutIndex; i < data.length - cutIndex; i+=8) {
            const remain = data.slice(i, i+8);
            allDayData.push(remain)
            const tempList = remain.map(item => item.main.temp)
            maxTemp.push(Math.round(Math.max(...tempList)))
            minTemp.push(Math.round(Math.min(...tempList)))
        }
    }
    function showDetails(e,index) {
        if (selectedDay !== index) {
            const arrows = document.querySelectorAll('.forecastArrow');
            if (selectedDay !== -1) {
                arrows[selectedDay].style.transform = 'rotate(90deg)';
            }
            e.target.style.transform = 'rotate(-90deg)';
            setSelectedDay(index)
            setThisDayData(draft => {
                draft.forEach((data, i) => {
                    data.value = Math.round(allDayData[index][i].main.temp)
                    data.pop = Math.round(allDayData[index][i].pop * 100)
                    data.speed = Math.round(allDayData[index][i].wind.speed * 3.6)
                    data.icon = allDayData[index][i].weather[0].icon
                })
            })
        } else {
            setSelectedDay(-1)
            e.target.style.transform = 'rotate(90deg)';
        }
    }

    return(
        <div>
            <div class="futureTittle">
                <h2>未來{maxTemp.length}天預測</h2>
                <h4>最高/低温</h4>
            </div>
            <ul className="week-forecast">
                {maxTemp.map((item, index) => {
                    const day = weekday + index + 1;
                    const i = day >= 7 ? day - 7 : day 
                    return <li key={day}>
                        <div class="liTop">
                            <div class="weekday-temp">
                                <span>{daysOfWeek[i]}</span>
                                <span>{item}° / {minTemp[index]}°</span>
                            </div>
                                <span 
                                class="forecastArrow" 
                                onClick={(e) => showDetails(e,index)}>❱
                                </span>
                        </div>
                        {selectedDay === index && <ForecastTable dataList={thisDayData}></ForecastTable>}
                        </li>
                })}
            </ul>
        </div>
    )
}
const daysOfWeek = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];