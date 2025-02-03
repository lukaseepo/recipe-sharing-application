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
  public recipeTitle = '';
  public constructor(private recipeService: RecipesService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.getRecipes();
  }
  selectedCities!: any;

  public cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  public recipeNameChange() {
    if (!this.recipeTitle || this.recipeTitle.trim() === '') {
      this.getRecipes();
    } else {
      this.recipes = this.recipes.filter((recipe) => {
        return recipe.recipeTitle.toLowerCase().includes(this.recipeTitle.toLowerCase());
      });
    }
  }

  public getRecipes() {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res;
      this.cdr.markForCheck();
    })
  }
}
