import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtPaginatorIntl } from './core/material/pt-paginator-intl';
import { MaterialBundleModule } from './core/material/bundle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialBundleModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
