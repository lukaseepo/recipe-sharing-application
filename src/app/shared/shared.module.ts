import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCardComponent} from './components/recipe-card/recipe-card.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from './components/quill-editor/quill-editor.component';
import {QuillModule} from 'ngx-quill';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { FilterComponent } from './components/filter/filter.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCardComponent,
    QuillEditorComponent,
    HeaderComponent,
    FilterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MultiSelectModule,
    MatRippleModule,
    ReactiveFormsModule,
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
    FormsModule,
    MultiSelectModule,
    HttpClientModule,
    ToastModule,
    MatRippleModule,
    MatDialogModule
  ]
})
export class SharedModule {
}
