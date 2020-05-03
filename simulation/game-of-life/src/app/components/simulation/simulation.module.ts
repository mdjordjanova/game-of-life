import { NgModule } from "@angular/core";
import { SimulationComponent } from './simulation.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule
  ],
  providers: []
})
export class SimulationModule { }