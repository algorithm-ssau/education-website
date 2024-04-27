import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsMobileService {
  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    document.documentElement.offsetWidth <= 500,
  );

  public constructor() {
    window.addEventListener('resize', () => {
      this.subject.next(document.documentElement.offsetWidth <= 500);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public get isMobile(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
