import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page.component';
import { SensorPageComponent } from './features/sensor-table/sensor-table.component';
import { SensorFormComponent } from './features/sensor-form/sensor-form.component'
import { AdminGuard } from './core/guards/admin.guard'
import { IsLoggedGuard } from './core/guards/is-logged.guard'
import { from } from 'rxjs';

const routes: Routes = 
[
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'sensors',
    children: [
      {
        path: 'create',
        component: SensorFormComponent,
        canActivate: [AdminGuard]
      },
      {
        path: ':id/edit',
        component: SensorFormComponent,
        canActivate: [AdminGuard]
      },
      {
        path:'',
        component: SensorPageComponent,
        canActivate: [IsLoggedGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sensors'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
