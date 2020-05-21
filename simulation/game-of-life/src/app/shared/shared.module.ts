import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { GameOfLifeEngine } from './engines/game-of-life.engine';
import { PipesModule } from './pipes/pipes.module';
import { ModalService } from './services/modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    GameOfLifeEngine,
    ModalService
  ]
})
export class SharedModule { }
