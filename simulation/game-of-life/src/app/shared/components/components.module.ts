import { NgModule } from "@angular/core";
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  exports: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [],
  providers: []
})
export class ComponentsModule { }