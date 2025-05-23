const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  const R = 6371e3; // kilometers
  const phi1 = (latitude1 * Math.PI) / 180; // phi, landa in radians
  const phi2 = (latitude2 * Math.PI) / 180;
  const deltaPhi = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLanda = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLanda / 2) *
      Math.sin(deltaLanda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in kilometers
};

export default calculateDistance;
