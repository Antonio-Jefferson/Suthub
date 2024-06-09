export const parseCurrency = (value: string) => {
  const parsedValue = parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.'));
  return isNaN(parsedValue) ? 0 : parsedValue;
};