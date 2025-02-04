export interface Recipe {
  recipeTitle: string;
  recipeDescription: string;
  recipeImage: string;
  favorite: boolean;
  id: string;
  recipeIngredients: Ingredient[];
  recipeInstructions: Instruction[];
}

export interface Ingredient {
  ingredient: string;
}

export interface Instruction {
 step: string;
}
