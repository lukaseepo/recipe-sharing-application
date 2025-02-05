import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../../shared/models/recipe';
import {UtilityService} from '../../core/services/utility.service';

@Component({
  selector: 'app-favorite-recipes',
  standalone: false,

  templateUrl: './favorite-recipes.component.html',
  styleUrl: './favorite-recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteRecipesComponent implements OnInit {
  public recipes: Recipe[] = [];
  public allRecipes: Recipe[] = [];
  @Input() public recipeIngredients: { name: string }[] = [];
  public constructor(private cdr: ChangeDetectorRef, private utilityService: UtilityService, private recipeService: RecipesService) {
  }

  public ngOnInit() {
    this.getRecipes();
  }


  public getRecipes() {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res.filter((recipe) => recipe.favorite);
      this.allRecipes = [...this.recipes];
      this.recipeIngredients = this.utilityService.extractUniqueIngredients(this.recipes);
      this.cdr.markForCheck();
    })
  }
}
