import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../../shared/models/recipe';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  public recipes!: Recipe[];
  public allRecipes!: Recipe[];
  public recipeIngredients: { name: string }[] = [];
  public constructor(private recipeService: RecipesService, private cdr: ChangeDetectorRef) {

  }

  public ngOnInit() {
    this.getRecipes();
  }

  private extractUniqueIngredients(recipes: Recipe[]): void {
    const allIngredients = recipes.flatMap(recipe =>
      recipe.recipeIngredients.map(ing => ing.ingredient)
    );

    this.recipeIngredients = [...new Set(allIngredients)]
      .filter(ingredient => ingredient && ingredient.trim() !== '')
      .map(ingredient => ({ name: ingredient }));
  }


  public getRecipes() {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res;
      this.allRecipes = res;
      this.extractUniqueIngredients(res);
      this.cdr.markForCheck();
    })
  }
}
