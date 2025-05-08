"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
}

function GoogleMapComponent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=maps,marker&v=beta`;
    script.async = true;
    document.head.append(script);

    script.addEventListener('load', () => {
      if (window.initMap) {
        window.initMap();
      }
    });

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    window.initMap = function () {
      const mapElement = document.querySelector("#map");
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 51.117_279_052_734_375, lng: 17.064_872_741_699_22 },
          zoom: 14,
          mapId: "DEMO_MAP_ID",
          disableDefaultUI: true, // wyłącza wszystkie domyślne kontrolki
          zoomControl: true, // włącza kontrolkę zoomu
          mapTypeControl: false, // włącza kontrolkę typu mapy
          scaleControl: true, // włącza kontrolkę skali
          streetViewControl: true, // włącza kontrolkę Street View
          rotateControl: true, // włącza kontrolkę obrotu
          fullscreenControl: true, // włącza kontrolkę pełnego ekranu
        });

        new window.google.maps.Marker({
          position: { lat: 51.117_279_052_734_375, lng: 17.064_872_741_699_22 },
          map,
          title: "My location",
        });
      }
    };
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}

export default GoogleMapComponent;
