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
export async function getSingleHouse(req, res) {
  try {
    const id = req.params.id
    const house = await housesRepository.getHouseById(id)

    if (house) {
      res.status(200).json(house)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}
