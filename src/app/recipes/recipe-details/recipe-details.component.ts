import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/models/recipe';

@Component({
  selector: 'app-recipe-details',
  standalone: false,

  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  public recipe!: Recipe;
  public constructor(private recipeService: RecipesService, private route: ActivatedRoute) {
  }

  public ngOnInit() {
   this.getRecipeById();
  }

  public getRecipeById() {
    this.recipeService.getRecipeById(this.route.snapshot.params['id']).subscribe((res) => {
       this.recipe = res;
       console.log(this.recipe);
    })
  }

}
