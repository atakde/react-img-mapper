import React, { useState } from "react";
import "./app.scss";
import ImgMapper from "./components/ImgMapper";
import MyCustomMarker from "./MyCustomMarker";
import ExampleImage from "../public/assets/example.jpg";

const App = () => {
  const [markers, setMarkers] = useState([
    {
      top: 10,
      left: 50,
      name: "Marker 1",
      url: "https://www.google.com",
    },
    {
      top: 30,
      left: 20,
      name: "Marker 1",
      url: "https://www.atakann.com",
    },
    {
      top: 40,
      left: 40,
      name: "Marker 1",
      url: "https://www.google.com",
    },
  ]);
  return (
    <div className="container">
      <h1>Hey, welcomee to react img mapper!</h1>
      <small>Click to add a new dot!</small>
      <ImgMapper
        src={ExampleImage}
        markers={markers}
        setMarkers={setMarkers}
        onMarkerClick={(marker) => console.log(marker)}
        onMarkerHover={(marker) => console.log(marker)}
        MarkerComponent={MyCustomMarker}
      />
    </div>
  );
};

export default App;
