import express from 'express'
import * as db from '../db/functions'

const router = express.Router()

//GET all New Zealand info
router.get('/', async (req, res, next) => {
  try {
    const response = await db.getAllNewZealand()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

export default router
