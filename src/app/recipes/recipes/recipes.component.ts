import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../../shared/models/recipe';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
  public recipes!: Recipe[];
  public constructor(private recipeService: RecipesService) {
  }

  public ngOnInit() {
    this.getRecipes();
  }

  public getRecipes() {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res;
    })
  }
}
