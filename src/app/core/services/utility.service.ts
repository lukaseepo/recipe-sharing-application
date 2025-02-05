import { Injectable } from '@angular/core';
import {Recipe} from '../../shared/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  public filterEmptyValues(array: any[], key: string): any[] {
    return array.filter(item => item[key] && item[key].trim() !== '');
  }

  public extractUniqueIngredients(recipes: Recipe[]): { name: string }[] {
    const allIngredients = recipes.flatMap(recipe =>
      recipe.recipeIngredients.map(ing => ing.ingredient)
    );

    return [...new Set(allIngredients)]
      .filter(ingredient => ingredient && ingredient.trim() !== '')
      .map(ingredient => ({ name: ingredient }));
  }
}
