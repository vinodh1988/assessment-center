import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private eventSubject = new Subject<any>();

  // Observable stream for subscribers to listen to
event$ = this.eventSubject.asObservable();

  // Method to publish events
publishEvent(data: any) {
    this.eventSubject.next(data);
}
  status:boolean
  constructor() { }

  getStatus() {
    let token = sessionStorage.getItem("access_token")
    this.status = token?true:false;
    this.publishEvent(this.status)
  }

  setStatus(state:boolean) {
    this.publishEvent(state)
    this.status=state
  }
}
