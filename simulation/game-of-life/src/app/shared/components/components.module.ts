import { NgModule } from "@angular/core";
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [
    ContentComponent,
    FooterComponent,
    GridComponent,
    HeaderComponent,
    LayoutComponent
  ],
  exports: [
    ContentComponent,
    FooterComponent,
    GridComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class ComponentsModule { }