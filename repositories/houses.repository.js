import { pool } from "../db.js"

export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses")
  return result.rows
}
export async function getHouseById(id) {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id])

  if (result.rowCount === 0) {
    return null
  }
  return result.rows[0]
}
