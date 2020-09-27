import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from 'src/app/core/services/sensor.service';
import { Sensor } from 'src/app/models/Sensor';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum FormType {
    CREATE,
    EDIT
}

@Component({
    selector: 'sensor-form',
    templateUrl: './sensor-form.component.html',
    styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {
    types: string[];
    units: string[];
    formGroup: FormGroup;
    formType: FormType
    sensor: Sensor = {
        name: "",
        model: "",
        rangeFrom: 0,
        rangeTo: 0,
        location: "",
        description: "",
        sensorType: "",
        unit: ""
    }

    constructor(private sensorService: SensorService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar) {
        this.createForm();
    }

    ngOnInit(): void {
        this.sensorService.loadUnits().subscribe(
            (result: string[]) => { this.units = result }
        );
        this.sensorService.loadTypes().subscribe(
            (result: string[]) => { this.types = result }
        );
        this.route.paramMap.subscribe(
            (params => {
                const sensorId = Number(params.get('id'));
                if (sensorId) {
                    this.formType = FormType.EDIT;
                    this.sensorService.findById(sensorId).subscribe(
                        (response: Sensor) => { this.sensor = response },
                        (error) => { this.router.navigateByUrl('/sensors') }
                    );
                } else {
                    this.formType = FormType.CREATE;
                }
            })
        );
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            name: ['', [
                Validators.required,
                Validators.maxLength(30)
            ]],
            model: ['', [
                Validators.required,
                Validators.maxLength(15)
            ]],
            rangeFrom: ['', [Validators.required]],
            rangeTo: ['', [
                Validators.required,
                this.checkRange()
            ]],
            type: ['', [Validators.required]],
            unit: ['', [Validators.required]],
            location: ['', [
                Validators.required,
                Validators.maxLength(40)
            ]],
            description: ['', [
                Validators.required,
                Validators.maxLength(200)
            ]]
        });
    }

    checkRange(): (AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.formGroup
                && this._rangeTo.value > this._rangeFrom.value
                ? null
                : { matching: true };
        };
    }

    get _name() {
        return this.formGroup.get('name');
    }

    get _model() {
        return this.formGroup.get('model');
    }

    get _rangeTo() {
        return this.formGroup.get('rangeTo');
    }

    get _rangeFrom() {
        return this.formGroup.get('rangeFrom');
    }

    get _type() {
        return this.formGroup.get('type');
    }

    get _unit() {
        return this.formGroup.get('unit');
    }

    get _location() {
        return this.formGroup.get('location');
    }

    get _description() {
        return this.formGroup.get('description');
    }

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.formType == FormType.CREATE) {
                this.createSensor();
            } else {
                this.updateSensor();
            }
        }
    }

    updateSensor() {
        this.sensorService.updateSensor(this.sensor).subscribe(
            () => {
                this.toogleSuccessBar("Sensor updated successfully!");
                this.formGroup.reset();
            },
            () => { this.toggleErrorBar("Error in updating sensor") }
        );
    }

    createSensor() {
        this.sensorService.create(this.sensor).subscribe(
            () => {
                this.toogleSuccessBar("Sensor created successfully!");
                this.formGroup.reset();
            },
            (error) => {
                this.toggleErrorBar("Error in creating sensor");
            }
        );
    }

    cancel() {
        this.router.navigateByUrl('/sensors');
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