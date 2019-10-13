# Plugsurfing Event Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Challenge

1. Main screen should contain a list of "events" of two types "Call" and "Meeting":
  * user can create/edit/delete event;
  * events must be ordered by event date (desc);
  * all events fields should be shown on the main screen.

2. User can create/delete/edit event "Call":

  * fields: event_date (datetime), name (string), created_date (date), exactly 2 participants;
  * participant should provide a valid email;
  * when new "Call" type event is created an email about it should be sent to participants.

3. User can create/delete/edit event "Meeting":

  * fields: event_date (date), name (string), created_date (date), exactly 3 participants, * address (string);
  * participant is just a name;
  * clicking on the address (main screen) should open maps application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

