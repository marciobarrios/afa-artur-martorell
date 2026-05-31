const catalanWeekdays = [
  "diumenge",
  "dilluns",
  "dimarts",
  "dimecres",
  "dijous",
  "divendres",
  "dissabte",
] as const;

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function getDisplayMenuDay(
  menu: {
    month: number;
    year: number;
  },
  day: number,
) {
  const date = new Date(Date.UTC(menu.year, menu.month - 1, day, 12));
  const weekday = catalanWeekdays[date.getUTCDay()];

  return `${capitalize(weekday)} ${day}`;
}
