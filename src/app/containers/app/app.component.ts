import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'evm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Plugsurfing Event Manager';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe();
  }
}
