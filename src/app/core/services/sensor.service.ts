import { Injectable } from "@angular/core"
import { environment } from '../../../environments/environment'
import { HttpClient, HttpParams } from "@angular/common/http";
import { Sensor } from 'src/app/models/Sensor';

export interface SensorParams {
    textPart?:string;
    page?:number;
    perPage?:number;
}

@Injectable({providedIn: 'root'})
export class SensorService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    loadSensors(params: SensorParams) {
        let httpParams: HttpParams = new HttpParams;
        if(!params) {
            params = {};
        }
        if(params.page) {
            httpParams = httpParams.set('page', params.page.toString());
        }
        if (params.perPage) {
            httpParams = httpParams.set('perPage', params.perPage.toString());
        } else {
            httpParams = httpParams.set('perPage', '4');
        }
        if (params.textPart) {
            httpParams = httpParams.set('textPart', params.textPart);
        }
        return this.http.get(this.apiUrl + 'sensors', { params: httpParams });
    }
    
    loadTypes() {
        return this.http.get(this.apiUrl + 'sensor-types');
    }

    loadUnits() {
        return this.http.get(this.apiUrl + 'units');
    }

    remove(id: number) {
        return this.http.delete(this.apiUrl + 'sensors/' + id);
    }

    create(sensor: Sensor) {
        return this.http.post(this.apiUrl + 'sensors', sensor);
    }

    findById(id: number) {
        return this.http.get(this.apiUrl + 'sensors/' + id);
    }

    updateSensor(sensor: Sensor) {
        return this.http.put(this.apiUrl + 'sensors/' + sensor.id, sensor);
    }
}