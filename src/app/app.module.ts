import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { IgxListModule,IgxIconModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IgxListModule,
    IgxIconModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
