import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { GameOfLifeEngine } from './engines/game-of-life.engine';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  exports: [
    ComponentsModule,
    PipesModule
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    GameOfLifeEngine
  ]
})
export class SharedModule { }