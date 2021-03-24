import { Injectable } from '@angular/core';

export class Appointment {
    title: string;
    startDate: Date;
    endDate: Date;
    dayLong?: boolean;
    recurrence?: string;
    workerId: string;
}

export class Worker {
    id: string;
    text: any;
    name: string;
}

const workers: Worker[] = [
    {
        id: '1',
        text: 'WORKER 1',
        name: "Marcio"
    },
    {
        id: '2',
        text: 'WORKER 2',
        name: 'Vinicius'
    }
]

const appointments: Appointment[] = [
    {
        title: "Iteração 1",
        startDate: new Date("2021-05-02T08:45:00.000Z"),
        endDate: new Date("2021-05-05T09:45:00.000Z"),
        workerId: '1',
        
    }, {
        title: "Iteração 2",
        startDate: new Date("2021-05-03T09:00:00.000Z"),
        endDate: new Date("2021-05-10T11:00:00.000Z"),
        workerId: '2'
    },
    {
        title: "Iteração 3",
        startDate: new Date("2021-05-15T09:00:00.000Z"),
        endDate: new Date("2021-05-20T11:00:00.000Z"),
        workerId: '2'
    }
];

@Injectable({
    providedIn: 'root'
})
export class AppService {
    getAppointments(): Appointment[] {
        return appointments;
    }

    getWorkers(): Worker[] {
        return workers;
    }
}
