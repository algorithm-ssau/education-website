import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainPageComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, MainPageComponent],
})
export class CoreModule {}
