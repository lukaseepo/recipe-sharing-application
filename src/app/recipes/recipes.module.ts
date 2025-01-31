import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
