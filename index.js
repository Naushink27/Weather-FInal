const inpBTN = document.querySelector("input");
const srchBTN = document.querySelector("button");
const tempElem = document.getElementById("temp");
const dateElem = document.getElementById("Date");
const timeElem = document.getElementById("time");
const locationElem = document.getElementsByClassName("location")[0]; // Assuming there is only one element with this class
const iconElem = document.getElementById("img");
const text = document.getElementById("text");

srchBTN.addEventListener("click", async () => {
  const location = inpBTN.value;
  const data = await fetchWeather(location); // Await the fetchWeather function
  console.log(data);
  if (data) {
    inpBTN.value=" "
    UpdateDOM(data);
  
  }
  
});

async function fetchWeather(location) {
  const URL = `https://api.weatherapi.com/v1/current.json?key=b33b75c4f20b493bbd292808241607&q=${location}&aqi=no`;
  try {
    const response = await fetch(URL);
    if (response.status === 400) {
      alert("Invalid location!!!!");
    } else {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function UpdateDOM(data) {
  console.log("I will update the dom");
  const locationElem1 = data.location.name;
  
  const temp = data.current.temp_c;
  const [date, time] = data.location.localtime.split(" ");
  const weathertext = data.current.condition.text;
  const imgIcon = data.current.condition.icon;

  // Update the DOM
  locationElem.textContent = locationElem1;
  tempElem.textContent = `${temp}°C`;
  dateElem.textContent = date;
  timeElem.textContent = time;
  iconElem.src = imgIcon;
  text.textContent = weathertext;
}
