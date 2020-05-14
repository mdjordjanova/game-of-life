import { NgModule } from '@angular/core';
import { SimulationComponent } from './simulation.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

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
  providers: []
})
export class SimulationModule { }
