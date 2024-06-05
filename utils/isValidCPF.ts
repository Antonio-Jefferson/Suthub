export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let digit = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  digit = (sum * 10) % 11;
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  digit = (sum * 10) % 11;
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;

  return true;
}
