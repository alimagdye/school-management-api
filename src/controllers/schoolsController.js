import sanitizeHtml from "sanitize-html";
import pool from "../config/db.js";
import calculateDistance from "../utils/calculateDistance.js";

const listSchools = async function (req, res) {
  try {
    const latitude = sanitizeHtml(req.query.latitude);
    const longitude = sanitizeHtml(req.query.longitude);

    // first way:
    // const query = `
    //     SELECT *
    //         FROM schools
    // `;
    // const [rows] = await pool.execute(query); // array of schools objects
    // if (rows.length === 0) {
    //   return res.status(404).json({ message: "no schools found" });
    // }

    // res.status(200).json({
    //   message: "schools listed successfully",
    //   data: rows.sort(
    //     (a, b) =>
    //       calculateDistance(latitude, longitude, a.latitude, a.longitude) -
    //       calculateDistance(latitude, longitude, b.latitude, b.longitude)
    //   ), // sort by distance between the school and the user distance, ascending order
    // });

    // second way:
    const query = `
        SELECT *, calculate_distance_km(?, ?, latitude, longitude) AS distance
            FROM schools
                ORDER BY distance ASC;
    `;
    const [rows] = await pool.execute(query, [
      latitude,
      longitude
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "no schools found" });
    }

    res.status(200).json({
      message: "schools listed successfully",
      data: rows,
    });
  } catch (error) {
    console.error("error listing schools:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const addSchool = async function (req, res) {
  try {
    const name = sanitizeHtml(req.body.name);
    const address = sanitizeHtml(req.body.address);
    const latitude = sanitizeHtml(req.body.latitude);
    const longitude = sanitizeHtml(req.body.longitude);

    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)
    `;

    const [insertResult] = await pool.execute(query, [
      name,
      address,
      latitude,
      longitude,
    ]);

    const insertedId = insertResult.insertId;

    // Build the inserted row manually instead of querying again
    const insertedSchool = {
      id: insertedId,
      name,
      address,
      latitude,
      longitude,
    };

    res.status(201).json({
      message: "school added successfully",
      data: insertedSchool,
    });
  } catch (error) {
    console.error("error adding school:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export { addSchool, listSchools };
