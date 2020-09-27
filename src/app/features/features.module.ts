import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginFormComponent } from './login/components/login-form.component';
import { LoginPageComponent } from './login/pages/login-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SensorPageComponent } from './sensor-table/sensor-table.component'
import {TableModule} from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input'
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {MatSelectModule} from '@angular/material/select';
import { SensorFormComponent } from './sensor-form/sensor-form.component';


@NgModule({
    declarations: [
        SensorPageComponent,
        LoginPageComponent,
        LoginFormComponent,
        SensorFormComponent
    ],
    imports: [
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        DialogModule,
        CalendarModule,
        ContextMenuModule,
        MultiSelectModule,
        SliderModule,
        ToastModule,
        ProgressBarModule,
        TableModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
    ],
    exports: []
})
export class FeaturesModule {

}