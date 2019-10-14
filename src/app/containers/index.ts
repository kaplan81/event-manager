import { AppComponent } from './app/app.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventNewComponent } from './event-new/event-new.component';
import { EventsComponent } from './events/events.component';

export const containers: any[] = [
  AppComponent,
  EventsComponent,
  EventNewComponent,
  EventEditComponent
];

export * from './app/app.component';
export * from './event-edit/event-edit.component';
export * from './event-new/event-new.component';
export * from './events/events.component';
