import React, {useState} from 'react';
import axios from 'axios';

const api = {
  key: 'acdc2d3db2338e661cb1d27c3484514f',
  base: 'https://api.openweathermap.org/data/2.5/',
        
}

const App = () => {
  const [input, setInput] = useState('')
  const [weather, setWeather] = useState({})

  const search = async () => {
    const responce = await axios.get(`${api.base}weather?q=${input}&units=metric&APPID=${api.key}`)
    setWeather(responce.data);
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    search()
    setInput('')
    console.log(weather.name)
   }

  const handleChange = (e) => {
    setInput(e.target.value)
    
  }  

  const dateBuilder = (d) =>{
    let months = ['January', 'Febuary', 'March', 'April', 'May',
                  'June', 'July', 'August', 'September', 'October',
                'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    
    return `${day} ${date} ${month} ${year}`
  }

  const handleWeather = () =>{
    if (typeof weather.main != "undefined"){
      if (weather.main.temp >= 27){
        return 'app summer'
      }else if (weather.main.temp <= 26 && weather.main.temp >= 19){
        return 'app spring'
      }else if (weather.main.temp <= 19 && weather.main.temp >= 5){
        return 'app autmn'
      }else{
        return 'app winter'
      }

    }else{
      return 'app'
    }
  }

  return (
    <>
   <div className={handleWeather()}>
     <main>
       <div className='search-box'>
        <form className='form' onSubmit={handleSubmit}
>         <input className='search-bar'   
                type='text'
                placeholder='Search...'
                value={input}
                onChange={handleChange}
          />    
          <button className='search-button'>Search</button>

          </form>   
       </div>
       {(typeof weather.main != "undefined") ? (
        <div className='main-box'>
          <div className="location-box">
            <div className="location">{weather.name} {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
       
     </main>
   </div>
   </>
  );
}

export default App;
