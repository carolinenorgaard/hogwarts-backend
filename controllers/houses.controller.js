import * as housesRepository from "../repositories/houses.repository.js"

export async function getAllHouses(req, res) {
  try {
    const houses = await housesRepository.getAllHouses()
    res.status(200).json(houses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}
