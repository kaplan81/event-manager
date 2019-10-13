import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    const url = `events`;

    return this.http.get(url).pipe(
      tap((val: Event[]) => console.log(val)),
      catchError(this.errorService.handleHttpError('getEvents'))
    );
  }
}
