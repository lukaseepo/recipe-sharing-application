import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipesService} from '../../../recipes/recipes.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent {
  @Input() public recipes!: Recipe[];
  @Input() public allRecipes!: Recipe[];
  @Input() public recipeIngredients: { name: string }[] = [];
  @Input() public onFavoritePage = false;
  public recipesFiltered = false;

  constructor(private recipeService: RecipesService, private cdr: ChangeDetectorRef ) {
  }

  public addToFavorites(id: string, recipe: Recipe) {
    this.recipeService.editRecipe( {...recipe, favorite: true}, id).subscribe(() => {
      this.cdr.markForCheck();
    })
  }

  public removeFromFavorites(id: string, recipe: Recipe) {
    this.recipeService.editRecipe( {...recipe, favorite: false}, id).subscribe(() => {
      this.cdr.markForCheck();
    })
  }

}
