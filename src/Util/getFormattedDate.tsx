export const getFormattedDate = (dateToFormat: string) => {
  const date = new Date(dateToFormat)

  // Note: formatted string works but month and year for all data returned by API is the same (e.g. May 22)
  const formattedDate = `${date.toLocaleString("en-US", { month: "short" })} ${date
    .getUTCFullYear()
    .toString()
    .substring(2)}` // Note: I wasn't sure if the requirement was DD or YY so I used YY as it made sense after the month

  return formattedDate
}
