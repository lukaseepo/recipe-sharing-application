import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import {RecipeAddComponent} from './recipe-add/recipe-add.component';

const routes: Routes = [{
  path: '',
  component: RecipesComponent
}, {
  path: 'recipe-add',
  component: RecipeAddComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
