export interface Ingredient {
  name: string;
}

export interface Instruction {
  step: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
