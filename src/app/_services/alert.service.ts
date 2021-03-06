import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = true;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = true;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string) {
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = true) {
        this.subject.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    deleteMessage() {
        //clear alert
        this.subject.next();
    }
}   