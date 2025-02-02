import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Aura from '@primeng/themes/aura';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import "quill-paste-smart";
import { SharedModule } from "./shared/shared.module";
import { MessageService } from 'primeng/api';
import {providePrimeNG} from 'primeng/config';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    { provide: MessageService, useClass: MessageService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
