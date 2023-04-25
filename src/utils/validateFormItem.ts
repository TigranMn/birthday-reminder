const validateEmail = (email: string): string | null => {
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return 'Invalid email'
  return null
}

export const validateConfirmPassword = (password: string, confirmPass: string) => {
  if (password !== confirmPass) return 'Passwords are different'
  return null
}

const validatePassword = (password: string): string | null => {
  if (password.length < 6) return 'Invalid password'
  return null
}

export const validateFormItem = (name: string, label: string, value: string): string | null => {
  if (!value.trim()) return `${label} is required`
  if (name === 'email') {
    return validateEmail(value)
  }
  if (name === 'password') return validatePassword(value)
  return null
}
