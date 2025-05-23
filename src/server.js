import express from "express";
import {
  globalMiddleware,
  errorHandler,
} from "./middleware/globalMiddleware.js";
import schoolsRoutes from "./routes/schoolsRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(globalMiddleware); // this middleware will be executed for every request

app.get("/", function (req, res) {
  res.json({ msg: "School Management API" });
});

app.use(schoolsRoutes); // this has the routes for the schools

app.use(errorHandler); // if any unxpected synchronous error occurs, this middleware will catch it

app.listen(PORT, function () {
  console.log("Server is running on port", PORT);
});
