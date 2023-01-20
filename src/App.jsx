import './App.css';
import {useEffect, useState} from "react";

function App() {

    const color = "#5072A7"

    const [city, setCity] = useState("");
    const [newCity, setNewCity] = useState("");
    const [country] = useState("FRANCE");

    const [temperature, setTemperature] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("Not found");
    const [advice, setAdvice] = useState("Pas de nouvelles bonnes nouvelles !");

    useEffect(() => {

        const advices = {
            "Sunny": "Short T-shirt, il est temps de rayonner ! ",
            "Cloudy":"Un petit pantalon ne fera pas de mal",
            "Windy":"Du veeeent, vite un kwwwaaaayyyyy",
            "Rainy":"Qui dit petite pluie dit parapluie",
            "Stormy":"Plus rien à faire là, prends la voiture"
        }

        if(city!=="") {
            fetch('https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/' + city)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTemperature(data['temperature']);
                    setWeatherCondition(data['condition'].charAt(0).toUpperCase() + data['condition'].slice(1));
                    setAdvice(advices[weatherCondition]);
                })
        }
    }, [city]);// eslint-disable-line react-hooks/exhaustive-deps

    function setCityFromFocusOut(){
        setCity(newCity);
    }

    return (
        <div className="App">

            <h1>Weather Report</h1>

            <input
                onKeyPress={(e) => {if (e.key === "Enter") {
                    e.preventDefault();
                    setCity(newCity);
                }}}

                onBlur={setCityFromFocusOut}

                id="cityInput"
                type="text"
                placeholder="Rechercher"
                onChange={e => setNewCity(e.target.value)}
            />


            <p><span className="city">{city}</span> . {country}</p>

            <hr/>

            <div className="forecast">

                <div className="left">
                    <p className="pLeft">{temperature}°C</p>
                    <p className="pLeft">{weatherCondition}</p>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill={color}
                     className="bi bi-cloud-rain" viewBox="0 0 16 16">
                    <path
                        d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                </svg>

            </div>

            <hr/>

            <p className="advice">{advice}</p>
        </div>
    );
}

export default App;
