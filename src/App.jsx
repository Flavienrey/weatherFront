import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [city, setCity] = useState("");
    const [newCity, setNewCity] = useState("");
    const [country] = useState("FRANCE");

    const [temperature, setTemperature] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("Not found");
    const [advice, setAdvice] = useState("Pas de nouvelles bonnes nouvelles !");

    useEffect(() => {
        if(city!=="") {
            fetch('https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/' + city)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTemperature(data['temperature']);
                    setWeatherCondition(data['condition'].charAt(0).toUpperCase() + data['condition'].slice(1));

                })
        }
    }, [city]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const advices = {
            "Sunny": "Short T-shirt, il est temps de rayonner ! ",
            "Cloudy":"Un petit pantalon ne fera pas de mal",
            "Windy":"Du veeeent, vite un kwwwaaaayyyyy",
            "Rainy":"Qui dit petite pluie dit parapluie",
            "Stormy":"Plus rien à faire là, prends la voiture"
        }

        setAdvice(advices[weatherCondition]);
    }, [weatherCondition]);

        function setCityFromFocusOut(){
        setCity(newCity);
    }

    return (
        <div className="App">

            <h1>Weather Report</h1>

            <input
                onKeyPress={(e) => {if (e.key === "Enter") {
                    e.preventDefault();
                    setCity(newCity.toUpperCase());
                }}}

                onBlur={setCityFromFocusOut}

                id="cityInput"
                type="text"
                placeholder="Rechercher"
                onChange={e => setNewCity(e.target.value.toUpperCase())}
            />


            <p><span className="city">{city}</span> . {country}</p>

            <hr/>

            <div className="forecast">

                <div className="left">
                    <p className="pLeft temperature">{temperature}°C</p>
                    <p className="pLeft condition">{weatherCondition}</p>
                </div>

                <div id="logo">

                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor"
                         className="bi bi-brightness-low-fill" viewBox="0 0 16 16">
                        <path
                            d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z"/>
                    </svg>
                </div>


            </div>

            <hr/>

            <p className="advice">{advice}</p>
        </div>
    );
}

export default App;
