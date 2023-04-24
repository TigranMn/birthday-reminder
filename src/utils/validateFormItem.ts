const validateEmail = (email: string): string | null => {
  if (email.length < 3) return 'Invalid email'
  return null
}

const validatePassword = (password: string): string | null => {
  if (password.length < 3) return 'Invalid password'
  return null
}
export const validateFormItem = (name: string, value: string): string | null => {
  if (!value.trim()) return `${name} is required`
  if (name === 'email') {
    return validateEmail(value)
  }
  if (name === 'password') return validatePassword(value)
  return null
}
