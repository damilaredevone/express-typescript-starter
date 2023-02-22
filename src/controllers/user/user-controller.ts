import { Request, Response } from 'express'

const store = (req: Request, res: Response): any => {
  try {
    return res.status(200).json({})
  } catch (error) {}
}

export { store }
