import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BarDataDirective } from './shared/directivas/bar-data.directive';
// import {ChartsModule}  from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
