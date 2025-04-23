export default function ForecastTable({dataList}) {
    // const [thisDayData, setThisDayData] = useImmer(timeData)
    
    return(
        <table className="table forecast-table">
            <thead>
                <tr>
                    <th>時間</th>
                    <th>天气</th>
                    <th>氣溫 (°C)</th>
                    <th>降雨率 (%)</th>
                    <th>风速 (km/h)</th>
                </tr>
            </thead>
            <tbody>
            {dataList.map((data,index) => 
                <tr key={index}>
                <td>{data.time}</td>
                <td><div class="wheather-icon"
                style={{backgroundImage:`url(https://openweathermap.org/img/wn/${data.icon}@2x.png)`}}
                ></div></td>
                <td>{data.value}</td>
                <td>{data.pop}</td>
                <td>{data.speed}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}
  