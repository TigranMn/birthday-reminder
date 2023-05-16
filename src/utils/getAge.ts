export const getAge = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const age = Math.abs(new Date(diff).getUTCFullYear() - 1970)
  return age
}
