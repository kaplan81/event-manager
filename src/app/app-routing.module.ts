import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventNewComponent } from './containers';
import { EventEditComponent } from './containers/event-edit/event-edit.component';
import { EventsComponent } from './containers/events/events.component';

const eventsRoute = 'dashboard';

const routes: Routes = [
  {
    path: eventsRoute,
    component: EventsComponent
  },
  {
    path: 'new',
    component: EventNewComponent
  },
  {
    path: 'edit/:eventId',
    component: EventEditComponent
  },
  {
    path: '**',
    redirectTo: `/${eventsRoute}`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
