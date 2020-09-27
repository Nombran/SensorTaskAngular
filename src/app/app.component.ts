import { Component } from '@angular/core';
import { AppState } from './store/app.states';
import { Store } from '@ngrx/store';
import { GetStatus } from './store/actions/auth.actions';
import { Cookies } from '@cedx/ngx-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<AppState>,
    private cookies: Cookies) {
    if (this.cookies.get('token')) {
      this.store.dispatch(new GetStatus);
    }
  }
}
