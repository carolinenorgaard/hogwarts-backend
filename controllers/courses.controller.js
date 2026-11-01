import * as coursesRepository from "../repositories/courses.repository.js"

export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses()
    res.status(200).json(courses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function getSingleCourse(req, res) {
  try {
    const course = await coursesRepository.getCourseById(req.params.id)
    if (!course) {
      return res.sendStatus(404)
    }
    course.students = await coursesRepository.getStudentsByCourseId(course.id)
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function createCourse(req, res) {
  try {
    const { name, teacherId } = req.body
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const course = await coursesRepository.createCourse(name, teacherId)
    res.status(201).json(course)
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "teacher does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function updateCourse(req, res) {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }
    const course = await coursesRepository.updateCourse(req.params.id, name)
    if (course) {
      res.status(200).json(course)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function changeTeacher(req, res) {
  try {
    const { teacherId } = req.body
    if (!teacherId) {
      return res.status(400).json({ error: "teacherId is required" })
    }
    const course = await coursesRepository.setTeacher(req.params.id, teacherId)
    if (course) {
      res.status(200).json(course)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "teacher does not exist" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function addStudent(req, res) {
  try {
    const { studentId } = req.body
    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" })
    }
    const course = await coursesRepository.getCourseById(req.params.id)
    if (!course) {
      return res.sendStatus(404)
    }
    const link = await coursesRepository.addStudent(course.id, studentId)
    res.status(201).json(link)
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "student does not exist" })
    }
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "student is already on this course" })
    }
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function removeStudent(req, res) {
  try {
    const removed = await coursesRepository.removeStudent(
      req.params.id,
      req.params.studentId,
    )
    if (removed) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

export async function deleteCourse(req, res) {
  try {
    const deleted = await coursesRepository.deleteCourse(req.params.id)
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
