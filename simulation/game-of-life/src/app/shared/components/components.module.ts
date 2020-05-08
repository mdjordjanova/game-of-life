import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContentComponent,
    GridComponent,
    HeaderComponent
  ],
  exports: [
    ContentComponent,
    GridComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})
export class ComponentsModule { }
