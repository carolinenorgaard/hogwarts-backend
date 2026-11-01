import { pool } from "../db.js"

export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers")
  return result.rows
}

export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id])
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function createTeacher(name, houseId) {
  const result = await pool.query(
    "INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *",
    [name, houseId],
  )
  return result.rows[0]
}

export async function updateTeacher(id, name, houseId) {
  const result = await pool.query(
    "UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
    [name, houseId, id],
  )
  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}

export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id])
  return result.rowCount > 0
}
