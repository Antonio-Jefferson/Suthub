export function formatDate(date: string): string {
  const [ano, mes, dia] = date.split('-').map(Number);

  const formattedDia = dia < 10 ? `0${dia}` : dia;
  const formattedMes = mes < 10 ? `0${mes}` : mes;

  return `${formattedDia}/${formattedMes}/${ano}`;
}
