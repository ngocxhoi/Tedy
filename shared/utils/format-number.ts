import type { LngLat, LngLatLike } from "maplibre-gl";

export default (value: LngLatLike): [number, number] => {
  if (value instanceof Array)
    return [Number(value[0].toFixed(4)), Number(value[1].toFixed(4))];

  const data = value as LngLat;
  return [Number(data.lng.toFixed(4)), Number(data.lat.toFixed(4))];
};
