import { MapPath } from 'models/MapPath';
// import { Path } from 'models/Path';

const createPaths = (props: createPathsProps): any => {
  // const { mapPaths, pathsToDraw } = props;
  // const newPathToDraw: any = { ...pathsToDraw };
  // const keys: string[] = [];
  // const mapPathDirectionIcon = { icon: { path: google?.maps?.SymbolPath?.FORWARD_OPEN_ARROW, scale: 2 }, offset: '50%' };
  // const mapPathStartIcon = { icon: { path: google?.maps?.SymbolPath?.CIRCLE }, offset: '50%' };

  // mapPaths?.forEach((mapPath: MapPath) => {
  //   mapPath.path?.forEach((path: Path, index: number) => {
  //     const route = [new google.maps.LatLng(path.start.lat, path.start.lng), new google.maps.LatLng(path.end.lat, path.end.lng)];
  //     const lastRoute = route[route.length - 1];
  //     const key: string = `${mapPath.imei}-${route[0].lat()}-${route[0].lng()}-${lastRoute.lat()}-${lastRoute.lng()}`;

  //     /** Save the key for remove old paths */
  //     keys.push(key);

  //     /** Remove path if color changed (Force to draw again) */
  //     const colorChanged = newPathToDraw[key]?.polilyne?.strokeColor !== mapPath.color;
  //     if (colorChanged && newPathToDraw[key]) {
  //       newPathToDraw[key].polilyne.setMap(null);
  //       delete newPathToDraw[key];
  //     }
  //     if (!newPathToDraw[key]) {
  //       const polilyne: google.maps.Polyline = new google.maps.Polyline({
  //         strokeColor: mapPath.color,
  //         strokeOpacity: mapPath.strokeOpacity,
  //         strokeWeight: mapPath.strokeWeight,
  //         path: route,
  //         icons: index === 0 ? [mapPathStartIcon] : index === mapPath.path.length - 1 ? [] : [mapPathDirectionIcon],
  //       });
  //       newPathToDraw[key] = {
  //         start: { lat: route[0].lat(), lng: route[0].lng() },
  //         end: { lat: lastRoute.lat(), lng: lastRoute.lng() },
  //         polilyne,
  //       };
  //     }
  //   });
  // });

  // /** Remove old paths */
  // for (const key in newPathToDraw) {
  //   if (!keys.includes(key)) {
  //     newPathToDraw[key].polilyne.setMap(null);
  //     delete newPathToDraw[key];
  //   }
  // }

  // return newPathToDraw;
};

export default createPaths;

interface createPathsProps {
  mapPaths: MapPath[];
  pathsToDraw: any;
}
