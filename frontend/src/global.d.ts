declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    title?: string;
    image?: MarkerImage;
  }

  class MarkerImage {
    constructor(src: string, size: Size);
  }

  class Size {
    constructor(width: number, height: number);
  }

  function load(callback: () => void): void;

  namespace event {
    function addListener(target: Map | Marker, type: string, handler: () => void): void;
    function removeListener(target: Map | Marker, type: string, handler: () => void): void;
  }
}
