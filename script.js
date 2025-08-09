document.getElementById("getWeatherBtn").addEventListener("click", function() {
    const location = document.getElementById("locationInput").value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    // const apiKey = "49817f8474f347f98e499edf4b040ff8"; // Your API key
    // const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    const apiKey = "49817f8474f347f98e4105231250908"; // Your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        .then(data => {
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const weatherLower = condition.toLowerCase();

            // Display results
            document.getElementById("result").innerHTML = `
                🌍 Location: <b>${data.location.name}</b><br>
                🌡 Temperature: <b>${temp}°C</b><br>
                ⛅ Condition: <b>${condition}</b>
            `;

            // Change background based on weather
            if (weatherLower.includes("sunny") || weatherLower.includes("clear")) {
                document.body.style.background = "linear-gradient(to bottom, #fbc531, #ffeaa7)";
            } 
            else if (weatherLower.includes("rain") || weatherLower.includes("drizzle")) {
                document.body.style.background = "linear-gradient(to bottom, #4b79a1, #283e51)";
            } 
            else if (weatherLower.includes("cloud")) {
                document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
            } 
            else if (weatherLower.includes("snow")) {
                document.body.style.background = "linear-gradient(to bottom, #dfe9f3, #ffffff)";
            } 
            else if (weatherLower.includes("thunder") || weatherLower.includes("storm")) {
                document.body.style.background = "linear-gradient(to bottom, #232526, #414345)";
            } 
            else {
                // Default background
                document.body.style.background = "linear-gradient(to bottom, #89cff0, #ffffff)";
            }
        })
        .catch(error => {
            document.getElementById("result").innerHTML = `<span style="color:red;">${error.message}</span>`;
        });
});
