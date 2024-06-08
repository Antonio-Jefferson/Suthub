
export function validateOtherPetBreed(value: any, petBreed: any) {
  if (petBreed === 'Outro') {
    if (value.trim().length === 0) {
      throw new Error('Campo obrigatório quando a raça do pet é "Outro"');
    }
  }
}