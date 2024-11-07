import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { IgxSimpleComboModule, IgxNavbarModule, IgxButtonModule, IgxRippleModule, IgxToggleModule, IgxIconModule, IgxNavigationDrawerModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxSimpleComboModule,
    FormsModule,
    IgxNavbarModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxIconModule,
    IgxNavigationDrawerModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeRevealSdk,
    multi: true,
  },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

declare let $: any; 

export function initializeRevealSdk() {
  return () => {
  $.ig.RevealSdkSettings.setBaseUrl(`${environment.BASE_URL}`);
  // const theme = new $.ig.RevealTheme();
  // theme.regularFont = 'Montserrat';
  // theme.mediumFont = 'Montserrat';
  // theme.boldFont = 'Montserrat';
  // theme.accentColor = '#175f8f'; 
  // theme.chartColors = [
  // "#73C2FB", // Maya Blue
  // "#2980B9", // Alizarin
  // "#136296", // Belize Hole
  // "#FECB49", // Sunflower
  // "#FD9A30", // Wet Asphalt
  // "#EC6F24", // Emerald
  // "#51AE5A", // Carrot
  // "#318A3A", // Peter River
  // "#574E4E", // Orange
  // "#3B3636"  // Amethyst
  // ];

  // theme.fontColor = 'black';
  // theme.isDark = theme.fontColor !== 'black';
  //theme.dashboardBackgroundColor = 'white';
  //theme.visualizationBackgroundColor = 'white';
  //theme.visualizationMargin = '1px';
  // theme.useRoundedCorners = false;
  // $.ig.RevealSdkSettings.theme = theme;
  $.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true;  
  };
}


