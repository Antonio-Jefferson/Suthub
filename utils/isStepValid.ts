import { z } from 'zod';
import type { Ref } from 'vue';
import { RegisterSchema } from '~/schemas/RegisterSchema';

export function isStepValid(step: Ref<number>, state: any, errors: any) {
  clearErrors(errors);
  try {
    if (step.value === 1) {
      RegisterSchema.pick({
        fullName: true,
        dateOfBirth: true,
        CPF: true,
        petSpecies: true,
        petBreed: true,
        otherPetBreed: true,
      }).parse(state);
    } else if (step.value === 2) {
      RegisterSchema.pick({
        CEP: true,
        state: true,
        city: true,
        neighborhood: true,
        street: true,
        monthlyIncome: true
      }).parse(state);
    }
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach(err => {
        errors[err.path[0]] = err.message;
      });
    }
    return false;
  }
}

function clearErrors(errors: any) {
  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      errors[key] = '';
    }
  }
}
