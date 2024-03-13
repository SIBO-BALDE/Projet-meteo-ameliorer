

//appeler l'api de openweathermap
const API_KEY="e5ffe6493cd6de62796e4694831b20d4"

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

//creer une fonction
const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    console.log(URL, 'url');
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.weather || !data.main || !data.wind || !data.sys) {
      throw new Error("Données météo invalides");
    }

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
    return null;
  }
};

export { getFormattedWeatherData };
// const getFormattedWeatherData = async (city, units = "metric") => {
//     const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    
//    const data = await fetch(URL)
//    .then((res) => res.json())
//    .then((data) => data);
  
   
//    const
//     {weather, 
//     main: {temp, feels_like, temp_min, temp_max, pressure, 
//     humidity},
//     wind: {speed},
//     sys: {country},
//     name,
// } = data;


// const {description, icon}= weather[0];

// return {
//    description, 
//    iconURL: makeIconURL(icon), 
//    temp,
//    feels_like,
//    temp_min, 
//    temp_max,
//    pressure, 
//    humidity, 
//    speed,
//    country, 
//    name,
// };

// };
// export{getFormattedWeatherData};