import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './interceptors/token.interceptor'
import { ErrorInterceptor } from './interceptors/auth-error.interceptor'
import { SensorService } from './services/sensor.service'
import { JwtTokenService } from './services/jwt-token.service'

@NgModule({ imports: [HttpClientModule],
    declarations: [],
    providers: [{
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, 
    {
      provide:HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        SensorService,
        JwtTokenService
      ]
    }
  }
}