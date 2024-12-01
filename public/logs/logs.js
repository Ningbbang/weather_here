const myMap = L.map("map").setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data.data);

    for (item of data.data) {
        const marker = L.marker([item.lat, item.lon]).addTo(myMap);
        
        const txt = `
        The Weather here at {${item.lat}, ${item.lon}}is ${item.weather} with a temperature of ${item.temperature}°C`

        marker.bindPopup(txt);
    }
}
getData();