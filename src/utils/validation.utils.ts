import { genSaltSync, hashSync } from 'bcrypt'

const hashPassword = (password: string): string => {
  return hashSync(password, genSaltSync(8))
}

export { hashPassword }
