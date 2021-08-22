import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarDataDirective } from './directivas/bar-data.directive';



@NgModule({
  declarations: [
    BarDataDirective
  ],
  exports: [
     BarDataDirective,
     CommonModule
  ]
})
export class SharedModule { }
