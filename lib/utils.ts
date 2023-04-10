export function formatDate (date: string): string {
  return date.split("-").slice(1).join(" / ")
}


export function currentDateToString (): string {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}


export function alternateColor (idx: number): boolean {
    // write an algorithm that returns true or false base of the following example
    // if 0 or 1 return true
    // if 2 or 3 return false
    // if 4 or 5 return true

    const m = idx % 2
    return m === 0  //|| m === 1
}