import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import {SharedModule} from '../shared/shared.module';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FavoriteRecipesComponent } from './favorite-recipes/favorite-recipes.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeAddComponent,
    RecipeDetailsComponent,
    FavoriteRecipesComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
