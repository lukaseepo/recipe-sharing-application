import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RecipeListComponent,
    RouterModule
  ]
})
export class SharedModule { }
