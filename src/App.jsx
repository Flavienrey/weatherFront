import './App.css';
import {useEffect, useState} from "react";

function App() {

    const color = "#5072A7";

    const [city, setCity] = useState("");
    const [newCity, setNewCity] = useState("");
    const [country] = useState("FRANCE");

    const [temperature, setTemperature] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("Not found");
    const [advice, setAdvice] = useState("Pas de nouvelles bonnes nouvelles !");

    useEffect(() => {

        function success(pos) {
            const crd = pos.coords;
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);

            fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon=" + pos.coords.longitude + "&lat=" + pos.coords.latitude)
                .then(response => response.json())
                .then(data => {
                    setCity(data['city'].toUpperCase());
                })
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, []);

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

                    {
                        weatherCondition === "Sunny" ?  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill={color} className="bi bi-brightness-low-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z"/></svg>:
                            weatherCondition === "Cloudy" ? <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill={color} className="bi bi-cloud-sun-fill" viewBox="0 0 16 16"><path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/><path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg>:
                                weatherCondition === "Windy" ? <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill={color} className="bi bi-wind" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/></svg>:
                                    weatherCondition === "Rainy" ? <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill={color} className="bi bi-cloud-rain" viewBox="0 0 16 16"><path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/></svg>:
                                        weatherCondition === "Stormy" ? <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill={color} className="bi bi-cloud-lightning-rain" viewBox="0 0 16 16"><path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-.753-8.499a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1zM7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2z"/></svg>:<p></p>
                    }

                </div>

            </div>

            <hr/>

            <p className="advice">Conseil : {advice}</p>
        </div>
    );
}

export default App;
