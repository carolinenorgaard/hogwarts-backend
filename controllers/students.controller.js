import * as studentsRepository from "../repositories/students.repository.js"

export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents()
    res.status(200).json(students)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function getSingleStudent(req, res) {
  try {
    const student = await studentsRepository.getStudentById(req.params.id)
    if (student) {
      res.status(200).json(student)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.code === "22P02") {
      return res.sendStatus(400)
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function createStudent(req, res) {
  try {
    const { name, year, houseId } = req.body ?? {}
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const student = await studentsRepository.createStudent(name, year, houseId)
    res.status(201).json(student)
  } catch (err) {
    if (err.code === "22P02") {
      return res.sendStatus(400)
    }
    if (err.code === "23503") {
      return res.status(400).json({ error: "house does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function updateStudent(req, res) {
  try {
    const { name, year, houseId } = req.body ?? {}
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const student = await studentsRepository.updateStudent(
      req.params.id,
      name,
      year,
      houseId,
    )
    if (student) {
      res.status(200).json(student)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.code === "22P02") {
      return res.sendStatus(400)
    }
    if (err.code === "23503") {
      return res.status(400).json({ error: "house does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function deleteStudent(req, res) {
  try {
    const deleted = await studentsRepository.deleteStudent(req.params.id)
    if (deleted) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.code === "22P02") {
      return res.sendStatus(400)
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}
