import express from "express"
import * as teachersController from "../controllers/teachers.controller.js"

const teachersRouter = express.Router()

teachersRouter.get("/", teachersController.getAllTeachers)
teachersRouter.get("/:id", teachersController.getSingleTeacher)
teachersRouter.post("/", teachersController.createTeacher)
teachersRouter.put("/:id", teachersController.updateTeacher)
teachersRouter.delete("/:id", teachersController.deleteTeacher)

export default teachersRouter
