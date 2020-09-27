export interface Sensor {
    id?:number;
    name:string;
    model:string;
    rangeFrom: number;
    rangeTo: number;
    location: string;
    description: string;
    sensorType: string;
    unit: string;
}