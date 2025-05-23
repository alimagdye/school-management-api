import { Router } from "express";
import { addSchool, listSchools } from "../controllers/schoolsController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {
  validateInputString,
  validateInputFloat,
} from "../utils/inputValidators.js";
const schoolsRoutes = Router();

schoolsRoutes.get(
  "/listSchools",
  [
    validateInputFloat("latitude", -90, 90, false),
    validateInputFloat("longitude", -180, 180, false),
  ],
  validationMiddleware,
  listSchools
);

schoolsRoutes.post(
  "/addSchool",
  [
    validateInputString("name"),
    validateInputString("address"),
    validateInputFloat("latitude", -90, 90),
    validateInputFloat("longitude"),
  ],
  validationMiddleware,
  addSchool
);

// note: The API follows the naming conventions provided in the task /addSchool, /listSchools
// however, for RESTful design, I recommend to use resource-based naming like POST /schools and GET /schools.
export default schoolsRoutes;
