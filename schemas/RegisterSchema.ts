import { z } from 'zod';
import { isValidCPF } from '~/utils/isValidCPF';

export const RegisterSchema = z.object({
  fullName: z.string()
  .min(1, { message: 'O nome completo é obrigatório' })
  .refine((value) => value.trim().split(' ').length >= 2, { message: 'O nome completo deve ter pelo menos duas palavras' }),
  dateOfBirth: z.string().refine(validateAge, { message: 'A idade deve estar entre 18 e 65 anos' }),
  CPF: z.string().refine(value => isValidCPF(value), { message: 'CPF inválido' }),
  petSpecies: z.enum(['cão', 'gato']),
  petBreed: z.string().min(1, { message: 'Raça do pet é obrigatória' }),
  CEP: z.string().regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }),
  state: z.string().length(2, { message: 'O estado deve ter 2 letras' }),
  city: z.string().min(1, { message: 'Cidade é obrigatória' }),
  neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
  street: z.string().min(1, { message: 'Rua é obrigatória' }),
  monthlyIncome: z.string().refine(value => parseFloat(value.replace('R$', '').replace(',', '.')) >= 1000, { message: 'Renda mensal mínima de R$ 1000,00' }),
  otherPetBreed: z.string().superRefine((value, petBreed) => validateOtherPetBreed(value, petBreed))
});


function validateAge(value: string): boolean {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
      return false;
  }
  const ageInMillisecs = Date.now() - date.getTime();

  const ageInYears = ageInMillisecs / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears >= 18 && ageInYears <= 65;
}

function validateOtherPetBreed(value: any, petBreed: any) {
  if (petBreed === 'Outro') {
    if (value.trim().length === 0) {
      throw new Error('Campo obrigatório quando a raça do pet é "Outro"');
    }
  }
}