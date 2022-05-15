import React, { useRef, useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import "./marker.scss";

const ImgMapper = ({
  src,
  markers,
  setMarkers,
  onMarkerClick,
  onMarkerHover,
  additionalClass = "",
  altAttribute = "",
  MarkerComponent = null,
}) => {
  const imgReference = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageDimensions(imgReference.current.getBoundingClientRect());
  }, [imageLoaded]);

  const getMarkerPosition = (marker) => {
    return {
      top: `${marker.top}%`,
      left: `${marker.left}%`,
    };
  };

  const handleImageClick = (e) => {
    if (!imgReference.current) {
      return;
    }
    const name = prompt("Enter the name of the marker");
    const url = prompt("Enter the url of the marker");
    const [top, left] = calculateMarkerPosition(e, imageDimensions);
    const newMarker = {
      top,
      left,
      name: name || "Marker",
      url: url || "https://www.google.com",
    };
    setMarkers([...markers, newMarker]);
  };

  const calculateMarkerPosition = (mousePosition, imagePosition) => {
    console.log("mousePosition", mousePosition);
    console.log("imagePosition", imagePosition);
    const pixelsLeft = mousePosition.clientX - imagePosition.left;
    let pixelsTop;
    if (imagePosition.top < 0) {
      pixelsTop = mousePosition.pageY - window.scrollY + imagePosition.top * -1;
    } else {
      pixelsTop = mousePosition.pageY - window.scrollY - imagePosition.top;
    }
    const top = ((pixelsTop - 10) * 100) / imagePosition.height;
    const left = ((pixelsLeft - 10) * 100) / imagePosition.width;
    return [top, left];
  };

  return (
    <div className="marker-container">
      <img
        src={src}
        ref={imgReference}
        onClick={handleImageClick}
        alt={altAttribute}
        className={additionalClass}
        onLoad={() => setImageLoaded(true)}
      />
      {markers.map((marker, index) => {
        return MarkerComponent ? (
          <MarkerComponent
            markerStyle={getMarkerPosition(marker)}
            marker={marker}
            key={index}
          />
        ) : (
          <div
            key={index}
            className="marker"
            style={getMarkerPosition(marker)}
            onClick={() => onMarkerClick(marker)}
            onMouseOver={() => onMarkerHover(marker)}
          />
        );
      })}
    </div>
  );
};

ImgMapper.propTypes = {
  src: PropTypes.string.isRequired,
  markers: PropTypes.array.isRequired,
  setMarkers: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func,
  onMarkerHover: PropTypes.func,
  additionalClass: PropTypes.string,
  altAttribute: PropTypes.string,
  MarkerComponent: PropTypes.elementType,
};

export default ImgMapper;
