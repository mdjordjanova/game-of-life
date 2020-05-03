import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { GameOfLifeEngine } from './engines/game-of-life.engine';

@NgModule({
  declarations: [],
  exports: [
    ComponentsModule
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  providers: [
    GameOfLifeEngine
  ]
})
export class SharedModule { }