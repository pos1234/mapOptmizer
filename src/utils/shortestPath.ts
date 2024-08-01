const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };
  
  const findShortestPath = (locations: string | any[]) => {
    if (locations.length === 0) return [];
    
    const visited = new Set();
    const path = [locations[0]];
    visited.add(locations[0].id);
    
    while (visited.size < locations.length) {
      const lastLocation = path[path.length - 1];
      let nearest = null;
      let minDistance = Infinity;
      
      for (const location of locations) {
        if (!visited.has(location.id)) {
          const distance = calculateDistance(
            lastLocation.latitude,
            lastLocation.longitude,
            location.latitude,
            location.longitude
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearest = location;
          }
        }
      }
      
      path.push(nearest);
      visited.add(nearest.id);
    }
    
    return path;
  };
  
  export default findShortestPath;
  