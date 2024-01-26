import { DatePipe, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ApplicationConfig, Component, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MAT_DATE_LOCALE,  } from "@angular/material/core";
import { routes } from "./app.routes";


export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), importProvidersFrom(HttpClientModule,),
      DatePipe,
      { provide: LocationStrategy, useClass: HashLocationStrategy,},

      {provide: MAT_DATE_LOCALE, useValue: 'es'},

      provideAnimations()
  ]
}
