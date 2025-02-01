import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillEditorComponent } from './components/quill-editor/quill-editor.component';
import {QuillModule} from 'ngx-quill';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCardComponent,
    QuillEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot({
      theme: 'snow',
      modules: {
        toolbar: [['bold', { list: 'bullet' }]],
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
    QuillEditorComponent
  ]
})
export class SharedModule { }
