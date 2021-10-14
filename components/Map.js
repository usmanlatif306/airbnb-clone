import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setselectedLocation] = useState({});
  // console.log(selectedLocation.long);
  const coorinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coorinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/usmanlatif306/ckups3dpv2p3e17pjqyz4bzlm"
      mapboxApiAccessToken={process.env.mapbox}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setselectedLocation(result)}
              className="cursor-pointer animate-bounce"
              aria-label="push-pin"
            >
              <img
                src="https://img.icons8.com/ios/50/fa314a/pointer.png"
                className="h-8"
              />
            </p>
          </Marker>
          {/* showing popup on click the marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setselectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
