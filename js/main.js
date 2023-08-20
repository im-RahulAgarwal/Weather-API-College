fetch("city_coordinates.csv")
    .then((res) => {
        return res.text();
    })
    .then((csv) => {
        let rows = csv.split("\n");
        rows.forEach((row) => {
            let data = row.split(",");
            let optValue = "";
            let optText = "";
            data.forEach((da, index) => {
                if (index == 0) {
                    optValue = "lat=" + da + "&";
                }
                if (index == 1) {
                    optValue += "lon=" + da;
                }
                if (index == 2) {
                    optText = da + ", ";
                }
                if (index == 3) {
                    optText += da;
                }
            });
            let option = document.createElement("option");
            option.value = optValue;
            option.innerHTML = optText;
            document.querySelector("#myDD").append(option);
        });
    });

function showWeatherInfo(e) {
    document.querySelector("#result-div").innerHTML = "";
    fetch("https://www.7timer.info/bin/api.pl?" + e.value + "&product=civillight&unit=metric&output=json")
        .then((result) => result.json())
        .then((data) => {
            data.dataseries.forEach((weather) => {
                let resultDiv = document.createElement("div");
                resultDiv.classList.add("col");
                resultDiv.classList.add("mb-2");
                let date = formatDate(weather.date);
                resultDiv.innerHTML =
                    `<div class='card h-100'>
                    <p class='weather-date'>${date}</p>` +
                    `<div class="weather-icon-div">
                            <img class="weather-icon" src="images/${weather.weather}.png" alt="${weather.weather}" />
                        </div>` +
                    `<div class="card-body">
                        <p class="weather-description">${formatWeatherName(weather.weather)}</p>
                        <p class="weather-temperatures">Max: ${weather.temp2m.max} ºC</p>
                        <p class="weather-temperatures">Min: ${weather.temp2m.min} ºC</p>
                    </div>
                    </div>`;
                document.querySelector("#result-div").append(resultDiv);
            });
        })
        .catch((error) => console.log("Oops, the data is wrong for that city. Contact the webmaster."));
}

function formatDate(date) {
    let year = date.toString().substring(0, 4);
    let month = date.toString().substring(4, 6);
    let currDate = date.toString().substring(6, 8);
    return new Date(year, month - 1, currDate).toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" });
}

function formatWeatherName(weatherType) {
    if (weatherType == "ishower") {
        return "Isolated Showers";
    } else if (weatherType == "lightrain") {
        return "Light Rain";
    } else if (weatherType == "lightsnow") {
        return "Light Snow";
    } else if (weatherType == "mcloudy") {
        return "Medium Cloudy";
    } else if (weatherType == "mcloudy") {
        return "Occasional Showers";
    } else if (weatherType == "pcloudy") {
        return "Partially Cloudy";
    } else if (weatherType == "rainsnow") {
        return "Rain Snow";
    } else if (weatherType == "ts") {
        return "Thunderstorm";
    } else if (weatherType == "tsrain") {
        return "Thunderstorm with Rain";
    } else {
        return weatherType.substring(0, 1).toUpperCase() + weatherType.substring(1);
    }
}
