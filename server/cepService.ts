export async function fetchAddressFromCEP(cep: string): Promise<Address | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar endereço');
    }
    const data = await response.json();
    return {
      state: data.uf,
      city: data.localidade,
      neighborhood: data.bairro,
      street: data.logradouro
    };
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return null;
  }
}

interface Address {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}
