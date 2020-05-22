import { NgModule } from '@angular/core';
import { SimulationComponent } from './simulation.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatternService } from 'src/app/shared/services/pattern.service';

const routes: Routes = [
  {
    path: '',
    component: SimulationComponent
  }
];

@NgModule({
  declarations: [SimulationComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    PatternService
  ]
})
export class SimulationModule { }
