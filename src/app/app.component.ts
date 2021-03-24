import { Component, ViewChild } from '@angular/core';
import { DxContextMenuComponent } from 'devextreme-angular';
import { Appointment, AppService, Worker } from './app.service';

class MenuItem { text: string; action: (evt: any) => void }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public appointments: Appointment[];
    public currentDate: Date = new Date(2021, 4, 23);
    public workers: Array<Worker> = [];
    public cellContextMenuItems: MenuItem[];
    public dataSource: any[] = []; // Opção do menu de contexto

    public onContextMenuItemClick: (evt: any) => void
    public onContextMenuShowing: (evt: any) => void

    @ViewChild('contextMenu', { static: false }) contextMenu: DxContextMenuComponent;

    constructor(service: AppService) {

        this.workers = service.getWorkers();
        this.appointments = service.getAppointments();

        this.cellContextMenuItems = [
            { text: 'Teste', action: (e) => this.alert(e.appointmentData.title) }
        ];
    }

    public toNull = (evt: any) => { evt.cancel = true };

    public alert = (s: any) => window.alert(s);

    public onAppointmentContextMenu = (ctxMenuEvt: any) => {
        ctxMenuEvt.event.preventDefault();

        this.dataSource = this.cellContextMenuItems;

        this.onContextMenuShowing = (evt) => evt.cancel = ctxMenuEvt.appointmentData.title === 'Iteração 1'
        this.onContextMenuItemClick = (e) => e.itemData.action(ctxMenuEvt);
    }

    public onContextMenuHiding = (e: any) => this.dataSource = []
}
