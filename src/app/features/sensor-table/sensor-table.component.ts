import { Component, OnInit } from "@angular/core"
import { FormControl } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { from } from 'rxjs';
import { SensorParams, SensorService } from 'src/app/core/services/sensor.service';
import { Sensor } from '../../models/Sensor'
import { debounce } from 'lodash'
import { Observable } from 'rxjs'
import { SensorResponse } from '../../models/SensorResponse'
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { Router } from '@angular/router';
import {JwtTokenService } from '../../core/services/jwt-token.service'
import {Cookies} from '@cedx/ngx-cookies'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'sensor-page',
    templateUrl: './sensor-table.component.html',
    styleUrls: ['sensor-table.component.scss']
})
export class SensorPageComponent implements OnInit {
    loading: boolean;
    sensors: Sensor[];
    totalRecords: number;
    perPage: number = 5;
    currentPage: number = 1;
    searchFormControl: FormControl = new FormControl();
    authState: Observable<any>;
    userRole: string;

    constructor(
        private primengConfig: PrimeNGConfig,
        private sensorService: SensorService,
        private store: Store<AppState>,
        private router: Router,
        private jwtService: JwtTokenService,
        private cookies: Cookies,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.authState = this.store.select(selectAuthState);
        this.loading = true;
        this.loadSensors();
        this.primengConfig.ripple = true;
        this.updateUserRole();
        this.cookies.onChanges.subscribe(
            () => {
                this.updateUserRole();
            }
        )
    }

    updateUserRole() {
        const token: string = this.jwtService.getToken();
        const decodedToken = this.jwtService.decodeToken(token);
        this.userRole = decodedToken.roles.toString();
    }

    loadSensors(params?: SensorParams) {
        this.sensorService.loadSensors(params).subscribe(
            (response: SensorResponse) => {
                if (response._embedded) {
                    this.sensors = response._embedded.sensorDtoList;
                } else {
                    this.sensors = [];
                }
                this.totalRecords = response.page.totalElements;
                this.loading = false;
            },
            (error) => { }
        )
    }

    public debouncedSearch = debounce(() => {
        const textPart = this.searchFormControl.value;
        let params: SensorParams = {
            textPart: textPart
        }
        this.loadSensors(params);
    }, 500)

    changePageHandler(event: LazyLoadEvent) {
        const textPart = this.searchFormControl.value;
        this.currentPage = event.first / this.perPage + 1;
        let params: SensorParams = {
            page: this.currentPage,
            textPart: textPart
        }
        this.loadSensors(params);
    }

    logout() {
        this.store.dispatch(new LogOut());
    }

    createSensor() {
        this.router.navigateByUrl('/sensors/create');
    }

    removeSensor(id: number) {
        this.sensorService.remove(id).subscribe(
            ()=> {
                this.toogleSuccessBar("Deleted successfully!");
                this.loadSensors();
            },
            () => {
                this.toggleErrorBar("Error while deleting!");
            }
        );
    }

    editSensor(id: number) {
        this.router.navigateByUrl('/sensors/' + id + "/edit");
    }

    toogleSuccessBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }

    toggleErrorBar(message: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-error'];
        config.duration = 3000;
        this._snackBar.open(message, null, config);
    }
}