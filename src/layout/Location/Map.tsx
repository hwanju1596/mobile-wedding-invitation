import { useEffect, useState } from 'react';
import data from 'data.json';

let mapInstance: naver.maps.Map | null = null;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

const Map = () => {
  const { lat, lon } = data.mapInfo;
  const [isMapLoaded, setMapLoaded] = useState(false);

  const initMap = () => {
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      center: new naver.maps.LatLng(lat, lon),
      zoom: 17,
      draggable: false,
      pinchZoom: false,
      scrollWheel: false,
      keyboardShortcuts: false,
    };

    if (document.getElementById('map')) {
      mapInstance = new naver.maps.Map('map', mapOptions);
    }

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lon),
      map: mapInstance ?? undefined,
    });

    setMapLoaded(true);
  };

  useEffect(() => {
    if (typeof naver === 'undefined') {
      loadScript(
        `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID as string ?? ""}`,
        initMap,
      );
    } else {
      initMap();
    }
  }, [lat, lon]);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '300px', marginTop: '40px' }}
    />
  );
};

export default Map;
