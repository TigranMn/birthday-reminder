export const getBirthdayDate = (birthday: string) => {
  const birthdayDate = new Date(birthday)

  const year = birthdayDate.getUTCFullYear()
  const day = birthdayDate.getUTCDate()
  const month = birthdayDate.getUTCMonth() + 1

  const finalBirthdayDate = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`

  return finalBirthdayDate
}
