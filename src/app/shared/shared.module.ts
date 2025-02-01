import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillEditorComponent } from './components/quill-editor/quill-editor.component';
import {QuillModule} from 'ngx-quill';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCardComponent,
    QuillEditorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot({
      theme: 'snow',
      modules: {
        clipboard: {
          matchVisual: false,
        },
      },
    }),
  ],
  exports: [
    CommonModule,
    RecipeListComponent,
    RouterModule,
    ReactiveFormsModule,
    QuillEditorComponent,
    HeaderComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
