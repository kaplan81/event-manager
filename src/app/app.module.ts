import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import * as fromComponents from './components';
import * as fromContainers from './containers';

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
