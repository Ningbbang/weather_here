function setup(){
    // let api_key = "7cdd8b065618db8a1023a545ea029399";

    let lat, lon;
    if ('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);
            
            const api_url = `/weather/${lat},${lon}`
            const response = await fetch(api_url);
            const json = await response.json();

            const weather = json.weather[0]["description"];
            const temperature = json.main.temp.toFixed(1);
            document.getElementById("summary").textContent = weather;
            document.getElementById("temperature").textContent = temperature;
            
            const data = {lat, lon, weather, temperature};
            const options = {
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            };

            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);
        })
    } else {
        console.log('geolocation not available');
    };
};
setup();