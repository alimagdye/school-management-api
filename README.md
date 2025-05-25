# school-management-api
A School Management API allows adding schools, getting the nearest school to farthest one to the user's location.

## Endpoints overview:

- GET / For API Health check

- POST addSchool/ Adds a new school to the database ( name, location, latitude, longitude).

- GET listSchools/ Returns all schools from the closest to the farthest based on users' provided coordinates.

## API Link
https://diligent-equinox-edge.glitch.me

Note: API is deployed on glitch which inactives it after 5 minutes, so the API link takes some seconds at the first request only every 5 minutes.

## Postman Collection
https://documenter.getpostman.com/view/43546600/2sB2qcBLRV

## Resume Link
https://drive.google.com/file/d/1FQ6d37F4XhtpjUPt3QishKOCQpvAKgb2/view?usp=sharing

## Improvement
I created a stored function in MySQL instead of JS function to be faster, and dosen't sort in the memory:
```
DELIMITER //

CREATE FUNCTION calculate_distance_km(
  lat1 DOUBLE, lon1 DOUBLE,
  lat2 DOUBLE, lon2 DOUBLE
) RETURNS DOUBLE
DETERMINISTIC
BEGIN
  DECLARE R INT DEFAULT 6371;
  DECLARE φ1, φ2, Δφ, Δλ, a, c DOUBLE;

  SET φ1 = RADIANS(lat1);
  SET φ2 = RADIANS(lat2);
  SET Δφ = RADIANS(lat2 - lat1);
  SET Δλ = RADIANS(lon2 - lon1);

  SET a = SIN(Δφ/2) * SIN(Δφ/2) +
          COS(φ1) * COS(φ2) * SIN(Δλ/2) * SIN(Δλ/2);
  SET c = 2 * ATAN2(SQRT(a), SQRT(1 - a));

  RETURN R * c;
END //

DELIMITER ;
```

Then query like:
```
SELECT *, calculate_distance_km(?, ?, latitude, longitude) AS distance
FROM schools
ORDER BY distance ASC;
```
