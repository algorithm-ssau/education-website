import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { ButtonDirective } from '../shared/components/button/button.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    ButtonComponent,
    ButtonDirective,
  ],
  exports: [HeaderComponent, FooterComponent, MainPageComponent],
})
export class CoreModule {}
