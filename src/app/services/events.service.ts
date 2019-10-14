import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  createEvent(event: Event): Observable<Event> {
    const url = `events`;

    return this.http.post<Event>(url, event);
  }

  deleteEvent(id: number): Observable<any> {
    const url = `events/${id}`;

    return this.http.delete(url).pipe(
      take(1),
      tap(() => console.log(`Event with id ${id} deleted`)),
      catchError(this.errorService.handleHttpError('deleteEvent'))
    );
  }

  getEvents(): Observable<Event[]> {
    const url = `events`;

    return this.http.get<Event[]>(url).pipe(
      map((events: Event[]) => {
        return events.sort((a, b) => b.date - a.date);
      }),
      tap((val: Event[]) => console.log(val)),
      catchError(this.errorService.handleHttpError('getEvents'))
    );
  }
}
