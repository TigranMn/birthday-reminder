export const validateCompanyInput = (value: string): string | null => {
  if (!value.trim()) return 'Please fill the name'
  else if (value.length > 56) return 'Cant be longer than 56 characters'
  return null
}
