export function getPolygonData(polygons) {
  if (!polygons) return [];
  const positionList = [];
  polygons.forEach(element => {
    element.path.forEach(coords => {
      if (
        coords.length > 0 &&
        coords[0].latitude !== undefined &&
        coords[0].longitude !== undefined
      ) {
        let item = {
          path: element.path,
          fillColor: element.fillColor,
          strokeColor: element.strokeColor,
        };
        positionList.push(item);
      }
    });
  });

  return positionList;
}
