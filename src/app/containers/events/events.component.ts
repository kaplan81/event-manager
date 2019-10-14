import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { EventService } from '../../services/events.service';
import { FormStateService } from '../../services/form-state.service';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]>;

  constructor(
    private eventService: EventService,
    private formStateService: FormStateService
  ) {
    this.formStateService.updateFormState(false);
  }

  ngOnInit(): void {
    this.refreshEvents();
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => this.refreshEvents());
  }

  private refreshEvents(): void {
    this.events$ = this.eventService.getEvents();
  }
}
