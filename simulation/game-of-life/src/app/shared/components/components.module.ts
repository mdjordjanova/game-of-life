import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    ContentComponent,
    GridComponent,
    HeaderComponent,
    LineChartComponent,
    ModalComponent
  ],
  exports: [
    ContentComponent,
    GridComponent,
    HeaderComponent,
    LineChartComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})
export class ComponentsModule { }
