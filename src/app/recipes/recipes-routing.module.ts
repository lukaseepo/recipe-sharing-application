import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [{
  path: '',
  component: RecipesComponent
}, {
  path: 'recipe-add',
  component: RecipeAddComponent,
}, {
  path: 'recipe-edit/:id',
  component: RecipeAddComponent,
}, {
  path: 'recipe-details/:id',
  component: RecipeDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
