export default function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to the month and padding with 0 if needed
  const day = String(date.getDate()).padStart(2, "0"); // Padding day with 0 if needed
  const hours = String(date.getHours()).padStart(2, "0"); // Padding hours with 0 if needed
  const min = String(date.getMinutes()).padStart(2, "0"); // Padding minutes with 0 if needed

  let pvm = `${day}.${month}.${year} ${hours}:${min}`;
  return pvm;
}
