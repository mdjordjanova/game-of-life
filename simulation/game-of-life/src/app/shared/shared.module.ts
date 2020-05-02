import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [],
  exports: [
    ComponentsModule
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  providers: []
})
export class SharedModule { }