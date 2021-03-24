import { AbstractType, Component, ViewChild } from '@angular/core';
import { DxContextMenuComponent } from 'devextreme-angular';
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
    cellContextMenuItems: any[];
    dataSource: any[] = []; // Opção do menu de contexto
    onContextMenuItemClick : any;

    @ViewChild('contextMenu', { static: false }) contextMenu: DxContextMenuComponent;
    constructor(service: AppService) {

      this.workers = service.getWorkers();
      this.appointments = service.getAppointments();

      this.cellContextMenuItems = [
        { text: 'Teste', onItemClick: this.alert },
      ];
    }

    public toNull = (evt: any) => { evt.cancel = true };
    public alert = (s: any) => window.alert(s);

    onAppointmentContextMenu(e: any) {
      this.dataSource = this.cellContextMenuItems;
      this.onContextMenuItemClick = this.onItemClick(e);
   }

    onContextMenuHiding(e: any) {
      this.dataSource = [];
     }

    onItemClick(contextMenuEvent) {
        return function (e) {
            e.itemData.onItemClick(contextMenuEvent, e);
        }
    }

  }
