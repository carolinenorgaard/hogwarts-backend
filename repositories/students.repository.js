import { pool } from "../db.js"

export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students")
  return result.rows
}

export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id])
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function createStudent(name, year, houseId) {
  const result = await pool.query(
    "INSERT INTO students (name, year, house_id) VALUES ($1, $2, $3) RETURNING *",
    [name, year, houseId],
  )
  return result.rows[0]
}

export async function updateStudent(id, name, year, houseId) {
  const result = await pool.query(
    "UPDATE students SET name = $1, year = $2, house_id = $3 WHERE id = $4 RETURNING *",
    [name, year, houseId, id],
  )
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1", [id])
  return result.rowCount > 0
}
