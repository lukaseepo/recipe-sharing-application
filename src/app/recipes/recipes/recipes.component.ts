import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../../shared/models/recipe';
import {UtilityService} from '../../core/services/utility.service';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];
  public allRecipes: Recipe[] = [];
  public recipeIngredients: { name: string }[] = [];
  public constructor(private recipeService: RecipesService, private utilityService: UtilityService, private cdr: ChangeDetectorRef) {

  }

  public ngOnInit() {
    this.getRecipes();
  }

  public getRecipes() {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res;
      this.allRecipes = res;
      this.recipeIngredients = this.utilityService.extractUniqueIngredients(res);
      this.cdr.markForCheck();
    })
  }
}
