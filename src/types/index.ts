export type ErrorResponse = {
  success: boolean
  error?: any
  message?: string
  status?: number
}

export type SuccessResponse = {
  success: boolean
  data: any
  message?: string
  status?: number
}

export type Rules = {
  [key: string]: string
}
