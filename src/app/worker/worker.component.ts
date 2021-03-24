import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-worker',
  template: `<span>{{ worker.name }}</span> <div><button (click)="alert()">Botão</button></div>`
})
export class WorkerComponent {

    @Input() worker: any;
    constructor() { }

    public alert = (): void => {
        window.alert(this.worker.name);
    }
  }
