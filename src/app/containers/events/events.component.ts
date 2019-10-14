import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { EventService } from '../../services/events.service';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]>;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.refreshEvents();
  }

  goToEdit(eventId: number): void {
    this.router.navigate(['edit', eventId]);
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => this.refreshEvents());
  }

  private refreshEvents(): void {
    this.events$ = this.eventService.getEvents();
  }
}
