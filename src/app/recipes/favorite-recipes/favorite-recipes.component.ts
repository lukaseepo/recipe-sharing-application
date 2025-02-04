import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../../shared/models/recipe';

@Component({
  selector: 'app-favorite-recipes',
  standalone: false,

  templateUrl: './favorite-recipes.component.html',
  styleUrl: './favorite-recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteRecipesComponent implements OnInit {
  public recipes!: Recipe[];
  public allRecipes!: Recipe[];
  @Input() public recipeIngredients: { name: string }[] = [];
  public constructor(private cdr: ChangeDetectorRef, private recipeService: RecipesService) {
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
      this.recipes = res.filter((recipe) => recipe.favorite);
      this.allRecipes = [...this.recipes];
      this.extractUniqueIngredients(this.recipes);
      this.cdr.markForCheck();
    })
  }
}
