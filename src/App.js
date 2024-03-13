import './index.css';
import Fotocouché from "./Components/Images/Fotocouché.jpg";
import Fotonature from "./Components/Images/Fotonature.jpg";

import Description from './Components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './WeatherService';
 




function App() {
  const [city, setCity] = useState("Dakar")

  const [weather, setWeather] = useState(null);

  const [units, setUnits] =useState("metric")
  const [bg,setBg] = useState(Fotocouché)

// Le hook UseEffectfonction  est un hook qui va
 //permettre de déclencher une fonction de manière asynchrone lorsque l'état du composant change. 
 //Cela peut permettre d'appliquer des effets de bords ou peut permettre de reproduire la logique 
 //que l'on mettait auparavant 
 //dans les méthodes componentDidMount et componentWillUnmount.
useEffect(() =>{
  const fetchdWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units)
setWeather(data);



  //dyna;ic bg
  const threshold = units ==='metric' ? 20 : 60;

  if(data.temp && data.temp <= threshold) setBg(Fotocouché);
  else setBg(Fotonature)
  };


  
  //appeler la fonction
  fetchdWeatherData();

}, [units, city]);

const handleUnitsClick =(e) =>{
const button = e.currentTarget;
const currentUnit = button.innerText.slice(1)
const isCelsius = currentUnit === 'C';
button.innerText = isCelsius ? '°F' : '°C'
setUnits(isCelsius ? "metric" : "imperial");

};
const enterKeyPressed = (e) =>{
  if (e.keyCode === 13) {
    setCity(e.currentTarget.value)
    e.currentTarget.blur()
  }

}
console.log("Weather in App component:", weather);



  return (

    <div className="App" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">

       { weather && (
          <div className="container">
        <div className="section section__inputs">
          <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..." />
          <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>
        <div className="section section__temperature">
          <div className="icon">
            <h3> {`${weather.name}, ${weather.country}`} </h3>
            <img src={weather.iconURL} alt="weatherIcon" />
            <h3>  {weather.description} </h3>
          </div>
          <div className="temperature">
            <h1> {`${weather.temp.toFixed()} °${units === 
              "metric" ? "C": "F"}`} </h1>
          </div>
        </div>
        <Description  weather={weather} units={units} />
       </div>

        )}
      
      </div>
    </div>


  );
  
}

export default App;
