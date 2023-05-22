import * as bcrypt from 'bcrypt'

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const password_hashed = await bcrypt.hash(password, salt)
  return password_hashed
}