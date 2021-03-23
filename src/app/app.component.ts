import { Component } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Appointment, AppService, Worker } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appointments: Appointment[];
    currentDate: Date = new Date(2021, 4, 23);

    workers: Array<Worker> = [];
    constructor(service: AppService) {

      this.workers = service.getWorkers();
      this.appointments = service.getAppointments();
    }

    public toNull = (evt: any) => { evt.cancel = true };
    public alert = (s: any) => window.alert(s);
}
