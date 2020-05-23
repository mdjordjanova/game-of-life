import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SlidePanelComponent } from './slide-panel/slide-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ContentComponent,
    GridComponent,
    HeaderComponent,
    LineChartComponent,
    ModalComponent,
    SlidePanelComponent
  ],
  exports: [
    ContentComponent,
    GridComponent,
    HeaderComponent,
    LineChartComponent,
    ModalComponent,
    SlidePanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})
export class ComponentsModule { }
