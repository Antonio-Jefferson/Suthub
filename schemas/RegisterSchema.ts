import { z } from 'zod';
import { isValidCPF } from '~/utils/isValidCPF';

export const RegisterSchema = z.object({
  fullName: z.string().min(3, { message: 'O nome completo deve ter pelo menos 3 caracteres' }),
  dateOfBirth: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, { message: 'Data de nascimento inválida' }),
  CPF: z.string().refine(value => isValidCPF(value), { message: 'CPF inválido' }),
  petSpecies: z.enum(['cão', 'gato']),
  petBreed: z.string().min(1, { message: 'Raça do pet é obrigatória' }),
  CEP: z.string().length(8, { message: 'CEP deve ter 8 dígitos' }),
  state: z.string().length(2, { message: 'O estado deve ter 2 letras' }),
  city: z.string().min(1, { message: 'Cidade é obrigatória' }),
  neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
  street: z.string().min(1, { message: 'Rua é obrigatória' }),
  monthlyIncome: z.string().refine(value => parseFloat(value.replace('R$', '').replace(',', '.')) >= 1000, { message: 'Renda mensal mínima de R$ 1000,00' }),
});