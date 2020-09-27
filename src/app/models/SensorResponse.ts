import { Page } from "./Page";
import { Sensor } from "./Sensor";

export interface SensorResponse {
    page: Page;
    _embedded?: SensorResponseEmbedded;
}

export interface SensorResponseEmbedded {
    sensorDtoList: Sensor[];
}

export interface Links {
    self: {href: string};
}

