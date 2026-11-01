import { pool } from "../db.js"

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses")
  return result.rows
}

export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id])
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function getStudentsByCourseId(courseId) {
  const result = await pool.query(
    `SELECT students.* FROM students
     JOIN course_students ON students.id = course_students.student_id
     WHERE course_students.course_id = $1`,
    [courseId],
  )
  return result.rows
}

export async function createCourse(name, teacherId) {
  const result = await pool.query(
    "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
    [name, teacherId],
  )
  return result.rows[0]
}

export async function updateCourse(id, name) {
  const result = await pool.query(
    "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
  )
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function setTeacher(id, teacherId) {
  const result = await pool.query(
    "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
    [teacherId, id],
  )
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function addStudent(courseId, studentId) {
  const result = await pool.query(
    "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *",
    [courseId, studentId],
  )
  return result.rows[0]
}

export async function removeStudent(courseId, studentId) {
  const result = await pool.query(
    "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2",
    [courseId, studentId],
  )
  return result.rowCount > 0
}

export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1", [id])
  return result.rowCount > 0
}
