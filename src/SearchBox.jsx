import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let gatherWeatherInfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        city: city,
        temp: (jsonResponse.main.temp - 273.15).toFixed(2),
        tempMin: (jsonResponse.main.temp_min - 274.15).toFixed(2),
        tempMax: (jsonResponse.main.temp_max - 273.15).toFixed(2),
        humidity: jsonResponse.main.humidity,
        feelsLike: (jsonResponse.main.feels_like - 273.15).toFixed(2),
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };
  let handleChange = (evt) => {
    setCity(evt.target.value);
  };
  let handleForm = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await gatherWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  // Clear error after 4 seconds
  if (error) {
    setTimeout(() => setError(false), 3000);
  }

  return (
    <div className="SearchBox">
      <form onSubmit={handleForm}>
        <TextField
          id="outlined-basic"
          label="Search city"
          variant="outlined"
          required
          style={{ marginRight: 12 }}
          value={city}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" style={{ marginTop: 7 }}>
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exist!</p>}
      </form>
    </div>
  );
}
