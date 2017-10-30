import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnDestroy {
    private Subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) {
        this.Subscription = alertService.getMessage().subscribe(message =>{ this.message = message;});
    }

    ngOnDestroy(): void {
        //memória szivárgás megakadályozása leiratkozással destroy-nál
        this.Subscription.unsubscribe();
    }
}