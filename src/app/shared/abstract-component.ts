import { Subject } from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

@Component({ template: '' })
export class AbstractComponent implements OnDestroy {
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {}

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    
}
