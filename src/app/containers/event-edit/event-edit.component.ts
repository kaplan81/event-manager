import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';
import { EventService } from '../../services/events.service';

@Component({
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent implements OnInit {
  event$: Observable<Event>;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getEvent(+params.get('eventId'))
      )
    );
  }
}
