import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloseNotificationService {
  private subject = new Subject<boolean>();

  public get closeNotification$(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public emitCloseEvent(): void {
    this.subject.next(true);
  }
}
