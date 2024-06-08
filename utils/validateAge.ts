export function validateAge(value: string): boolean {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
      return false;
  }
  const ageInMillisecs = Date.now() - date.getTime();

  const ageInYears = ageInMillisecs / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears >= 18 && ageInYears <= 65;
}
