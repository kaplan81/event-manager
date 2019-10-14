import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule
  ],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
