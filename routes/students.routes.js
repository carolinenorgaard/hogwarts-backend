import express from "express"
import * as studentsController from "../controllers/students.controller.js"

const studentsRouter = express.Router()

studentsRouter.get("/", studentsController.getAllStudents)
studentsRouter.get("/:id", studentsController.getSingleStudent)
studentsRouter.post("/", studentsController.createStudent)
studentsRouter.put("/:id", studentsController.updateStudent)
studentsRouter.delete("/:id", studentsController.deleteStudent)

export default studentsRouter
