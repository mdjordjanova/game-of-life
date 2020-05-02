import { NgModule } from "@angular/core";
import { SimulationComponent } from './simulation.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class SimulationModule { }