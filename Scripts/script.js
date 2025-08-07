addEventListener("DOMContentLoaded", function () {
    /* Este objeto alamacena todos lo elementos del HTML */
    let DOM = {
        Container_results : document.getElementById("Info-Weather-state"),
        State : document.getElementById("Input-Search-state"),
        BtnSearch : document.getElementById("Button-Search-state")
    }
    
    /* Esta funcion consulta la API de OpenWeatherMap y devuelve un objeto con los datos de la consulta */
    async function getWeather(city) {
        const ApiKey = "ff51056c35135c90b8a84c40e07e6c5c"
        const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},VE&appid=${ApiKey}`

        try {
            const response = await fetch(ApiUrl)

            if(!response.ok){
                return {
                    success : false,
                    status : response.status,
                    message : "No se encuentra este estado, en la en pais de Venezuela." 
                } 
            }
            let data = await response.json()

            return {
                success : true,
                temp : data.main.temp,
                name : data.name,
                country : data.sys.country,
                humidity : data.main.humidity,
                speedWind : data.wind.speed,
                description : data.weather[0].description
            }

        } catch (error) {
            return { success : false, message : error }
        }
    }


    /* Esta funcion imprime los datos de la consulta en el HTML */
    async function PrintWeather(data) {
        const result = await getWeather(data)

        if(!result.success){
            DOM.State.textContent = result.message
            return
        } 

        console.log(result)
        PrintHTML(result)
    }


    /* Esta funcion contiene los datos que se van a imprimir en el HTML */
    function PrintHTML(result){
        DOM.Container_results.innerHTML = ""
        DOM.Container_results.innerHTML = `
            <div id="Container-BasicInfor">
                <ul>
                    <li>Temperature: ${(result.temp - 273.15).toFixed(2)}°C</li>
                    <li>State: ${result.name}</li>
                    <li>Humidity: ${result.humidity}%</li>
                    <li>Speed Wind: ${result.speedWind}km/h</li>
                    <li>Description: ${result.description}</li>
                </ul>
            </div>
        `
    }

    DOM.BtnSearch.addEventListener("click", () =>{
        if(DOM.State.value === ""){
            alert("Please, insert a state")
            return
        }
        PrintWeather(DOM.State.value)
    })
})