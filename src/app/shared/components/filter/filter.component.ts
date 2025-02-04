import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Recipe} from "../../models/recipe";

@Component({
  selector: 'app-filter',
  standalone: false,

  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  @Input() public recipes!: Recipe[];
  @Input() public allRecipes!: Recipe[];
  @Input() public recipeIngredients: { name: string }[] = [];
  @Output() public recipesChange = new EventEmitter<Recipe[]>();
  public recipeTitle = '';
  public selectedRecipeIngredients: any[] = [];


  public filterRecipes(): void {
    this.recipes = this.allRecipes.filter(recipe => {
      const titleMatch = !this.recipeTitle ||
          recipe.recipeTitle.toLowerCase().includes(this.recipeTitle.toLowerCase());

      if (this.selectedRecipeIngredients.length === 0 ||
          this.selectedRecipeIngredients.length === this.recipeIngredients.length) {
        return titleMatch;
      }

      const ingredientMatch = this.selectedRecipeIngredients.some(selected =>
          recipe.recipeIngredients.some(ing =>
              ing.ingredient === selected.name
          )
      );

      return titleMatch && ingredientMatch;
    });
    console.log(this.recipes);
    console.log(this.allRecipes);
    this.recipesChange.emit(this.recipes);
  }
}
