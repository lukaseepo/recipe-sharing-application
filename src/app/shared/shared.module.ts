import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    RecipeListComponent
  ]
})
export class SharedModule { }
