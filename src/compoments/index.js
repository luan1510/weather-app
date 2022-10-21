import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Button from "@mui/material/Button";
import { input, style, pk, clock, image } from "./style";
import axios from "axios";
import removeAccents from "../helpers/removeAccent";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LastPageIcon from "@mui/icons-material/LastPage";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import { StepConnector } from "@mui/material";
const key = "8a6d884e27d91ee16980c5d96a1d22cc";

function Index() {
  //Get Time
  const [date, setDate] = useState(new Date());
  let h, m, s, f;
  const timer = () => {
    setDate(new Date());
  };
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();
  f = h > 12 ? "PM" : "AM";
  setTimeout(timer, 1000);

  //GET api
  const [cityName, setcityName] = useState("Hà Nội");
  const [search, setSearch] = useState("hà nội");
  const [main, setMain] = useState("");
  const [des, setDes] = useState("");
  const [temp, setTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [deg, setDeg] = useState(0);
  useEffect(() => {}, [search]);

  const getRender = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric&lang=vi`,
  };
  const handleSearch = (str) => {
    setSearch(removeAccents(str));
  };
  const handleRequest = async () => {
    try {
      const response = await axios(getRender);
      const { data } = response;
      const { main, name, weather, wind } = data;
      console.log(data);
      setTemp(main.temp);
      setMinTemp(Math.floor(main.temp_min));
      setMaxTemp(Math.ceil(main.temp_max));
      setHumidity(main.humidity);
      setPressure(main.pressure);
      setSpeed(wind.speed);
      setDeg(wind.deg);
      setcityName(name);
      setDes(weather[0].description);
      setMain(weather[0].main);
      setSearch("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <Box
      className="App"
      bg={
        h > 18
          ? "linear-gradient(160deg, rgb(23,115,234), rgb(208,223,255))"
          : "linear-gradient(50deg, rgb(208,223,255), rgb(23,115,234))"
      }
      style={style}
    >
      <Box pt="5%" style={{ display: "flex", widtd: "100%", margin: "0 auto" }}>
        <Box w="30%" style={{ fontFamily: "Orbitron, sansSerif" }}>
          <span style={clock}>
            {f} <span style={pk}>Luan</span>
          </span>
          :{" "}
          <span style={clock}>
            {h} <span style={pk}>hours</span>
          </span>
          :{" "}
          <span style={clock}>
            {m} <span style={pk}>minute</span>
          </span>
          :{" "}
          <span style={clock}>
            {s} <span style={pk}>second</span>
          </span>
        </Box>
        <Input
          style={input}
          w="50%"
          placeholder="Search city..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          style={{ marginLeft: 6, width: "15%", color: "#fff" }}
          onClick={handleRequest}
        >
          Search
        </Button>
      </Box>
      <Box style={image}>
        <Box
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            height: "70%",
            color: "rgb(139,195,195)",
            fontSize: "50px",
            marginRight: "2.5%",
            marginLeft: "2.5%",
          }}
        >
          <div style={{ textAlign: "left", lineHeight: "36px", marginTop: 17 }}>
            {main}
            <br />
            <span style={{ fontSize: "30px" }}>{des}</span>
          </div>
          <div
            style={{ textAlign: "right", lineHeight: "36px", marginTop: 17 }}
          >
            {temp.toFixed()}°C
            <br />
            <span style={{ fontSize: "30px" }}>{cityName}</span>
          </div>
        </Box>

        <Box
          style={{
            position: "inline-relative",
            justifyContent: "space-between",
            display: "flex",
            bottom: 0,
            width: "100%",
            height: "31%",
            background: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <span
            style={{ textAlign: "left", marginLeft: "2.5%", marginTop: "1.5%" }}
          >
            <StepConnector />
            <p style={{ display: "flex", margin: "10px" }}>
              <ThermostatIcon /> Cao/Thấp: {maxTemp}°C/{minTemp}°C
            </p>
            <StepConnector />
            <br />
            <p style={{ display: "flex", margin: "10px" }}>
              <LastPageIcon /> Áp suất khí quyển: {pressure}mb
            </p>
            <StepConnector />
          </span>
          <span
            style={{
              textAlign: "right",
              marginRight: "2.5%",
              marginTop: "1.5%",
            }}
          >
            <StepConnector />

            <p style={{ display: "flex", margin: "10px" }}>
              <OpacityIcon /> Độ ẩm: {humidity}%
            </p>
            <StepConnector />
            <br />
            <p style={{ display: "flex", margin: "10px" }}>
              <AirIcon /> Gió/Hướng gió: {(speed * 3.6).toFixed(1)}km/h/{deg}°
            </p>
            <StepConnector />
          </span>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
