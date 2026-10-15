export function formatArabicDate(dateString?: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: string = String(date.getFullYear()).slice(-2);

  const weekday: string = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
  }).format(date);

  return `${day} / ${month} / ${year} ${weekday}`;
}
