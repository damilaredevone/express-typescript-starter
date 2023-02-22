import { Request, Response } from 'express'

const store = async (req: Request, res: Response): Promise<void> => {
  try {
    return await res.status(200).json({})
  } catch (error) {}
}

export { store }
