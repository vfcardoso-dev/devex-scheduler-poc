import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DxContextMenuComponent } from 'devextreme-angular';
import { Appointment, AppService, Worker } from './app.service';
import { locale, loadMessages } from "devextreme/localization";

import * as ptMessages from "../assets/i18n/pt.json"
import * as enMessages from "../assets/i18n/en.json"

class MenuItem { text: string; action: (evt: any) => void }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public appointments: Appointment[];
    public workers: Array<Worker> = [];
    public cellContextMenuItems: MenuItem[];
    public dataSource: any[] = []; // Opção do menu de contexto

    private _currentDate: Date = new Date();

    public get currentDate() { return this._currentDate }
    public set currentDate(value: any) {
        const dtValue = typeof value === 'string' ? `${value}-02` : value; // Master POG

        this._currentDate = new Date(dtValue);
    }

    public reloading: boolean = false;

    public onContextMenuItemClick: (evt: any) => void = () => {}
    public onContextMenuShowing: (evt: any) => void = () => {}

    @ViewChild('contextMenu', { static: false }) contextMenu: DxContextMenuComponent;

    constructor(private service: AppService, private cd: ChangeDetectorRef) {

        loadMessages(ptMessages)
        loadMessages(enMessages)

        locale('en');

        this.workers = service.getWorkers();
        this.appointments = service.getAppointments();

        this.cellContextMenuItems = [
            { text: 'Teste', action: (e) => this.alert(e.appointmentData.title) }
        ]
    }

    public changeLocale(lang: string) { // não dá: https://github.com/DevExpress/DevExtreme/issues/12074
        this.reloading = true;
        this.cd.detectChanges();

        locale(lang)

        setTimeout(() => this.reloading = false)
    }

    public addAppointment = () => this.service.addAppointment();

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
