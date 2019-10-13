import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './containers/events/events.component';

const eventsRoute = 'dashboard';

const routes: Routes = [
  {
    path: eventsRoute,
    component: EventsComponent
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
