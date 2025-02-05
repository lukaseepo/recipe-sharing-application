import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'recipes',
}, {
  path: 'recipes',
  loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
}, {
  path: "**",
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
