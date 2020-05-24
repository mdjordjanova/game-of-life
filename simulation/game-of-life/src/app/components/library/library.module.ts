import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatternService } from 'src/app/shared/services/pattern.service';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent
  }
];

@NgModule({
  declarations: [LibraryComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    PatternService
  ]
})
export class LibraryModule { }
