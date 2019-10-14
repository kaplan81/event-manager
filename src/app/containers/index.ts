import { AppComponent } from './app/app.component';
import { EventNewComponent } from './event-new/event-new.component';
import { EventsComponent } from './events/events.component';

export const containers: any[] = [
  AppComponent,
  EventsComponent,
  EventNewComponent
];

export * from './app/app.component';
export * from './event-new/event-new.component';
export * from './events/events.component';
