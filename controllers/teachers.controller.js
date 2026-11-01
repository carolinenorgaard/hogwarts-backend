import * as teachersRepository from "../repositories/teachers.repository.js"

export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers()
    res.status(200).json(teachers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function getSingleTeacher(req, res) {
  try {
    const teacher = await teachersRepository.getTeacherById(req.params.id)
    if (teacher) {
      res.status(200).json(teacher)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function createTeacher(req, res) {
  try {
    const { name, houseId } = req.body
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const teacher = await teachersRepository.createTeacher(name, houseId)
    res.status(201).json(teacher)
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "house does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function updateTeacher(req, res) {
  try {
    const { name, houseId } = req.body
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const teacher = await teachersRepository.updateTeacher(
      req.params.id,
      name,
      houseId,
    )
    if (teacher) {
      res.status(200).json(teacher)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "house does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function deleteTeacher(req, res) {
  try {
    const deleted = await teachersRepository.deleteTeacher(req.params.id)
    if (deleted) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}
