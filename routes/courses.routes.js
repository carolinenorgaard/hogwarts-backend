import express from "express"
import * as coursesController from "../controllers/courses.controller.js"

const coursesRouter = express.Router()

coursesRouter.get("/", coursesController.getAllCourses)
coursesRouter.get("/:id", coursesController.getSingleCourse)
coursesRouter.post("/", coursesController.createCourse)
coursesRouter.put("/:id", coursesController.updateCourse)
coursesRouter.delete("/:id", coursesController.deleteCourse)

coursesRouter.put("/:id/teacher", coursesController.changeTeacher)
coursesRouter.post("/:id/students", coursesController.addStudent)
coursesRouter.delete(
  "/:id/students/:studentId",
  coursesController.removeStudent,
)

export default coursesRouter
