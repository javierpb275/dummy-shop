export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function strikeThrough(text: string): string {
  return text
    .split("")
    .map((char) => char + "\u0336")
    .join("");
}

export function calculatePercentage(
  quantity: number,
  percentage: number
): number {
  return Number(
    (quantity - Math.round(quantity * (percentage / 100) * 100) / 100).toFixed(
      2
    )
  );
}
