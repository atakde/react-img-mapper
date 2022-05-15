import React, { useState } from "react";

const MyCustomMarker = ({ marker, markerStyle }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <div
      style={markerStyle}
      className="marker-custom"
      onMouseLeave={() => setShowHover(false)}
      onMouseEnter={() => setShowHover(true)}
    >
      <div className="marker-circle"></div>
      <div className="marker-information"
        style={{
          display: showHover ? "block" : "none",
        }}
      >
        <h2>{marker.name}</h2>
        {marker.url && <a href={marker.url} target="_blank">{marker.name}</a>}
      </div>
    </div>
  );
};

export default MyCustomMarker;
