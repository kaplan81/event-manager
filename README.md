# Plugsurfing Event Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## JS Challenge

The description to the JS exercises are in `js-challenge/CHALLENGE.md`.

In order to check on the exercises 1 (`js-challenge/exersise-01.js`) and 2 (`js-challenge/exersise-02.js`), just open `js-challenge/index.html` in your browser.

After that open the console (dev tools) to check the results.

## Angular Challenge Description

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

## Up and runnning

After cloning this repo run this 2 commands:

```bash
npm i
npm start
```

You just launched the dev server. Now navigate to `http://localhost:4200/` in your browser to see thet app. It will automatically reload if you change any of the source files.

## Json Server

This project uses the [json-server](https://github.com/typicode/json-server) package, in order to produce a REST API based on a JSON file as database. In this case we  have called it `db.json`.

> Careful: this project will work directly on `db.json`, in runtime. This means that the file will be modify as you create or update the database entries through the app. If you want to start the database fresh just copy and replace the contents of `db.json` with the ones of `db-template.json`.

## Quality Assurance

1. You will find 8 cards on the dashboard page, each one containing an event. At the up and right corner you will find the "Create New Event" button. Click on it.
2. You can create events of 2 types: "Meeting" or "Call". The Meeting type is the default but if  you click on the "Call" radio button you will realize how the form changes its fields to adapt to this other type: a call has 2 participants instead of 3, and instead of introducing the participant's name, we introduce the email address. Besides there is no "Address" field when creating or editing a call.
3. All the fields are required and when introducing an email address it has to be a valid one. Once you have filled up everything correctly the submit button will automatically enable itself. Save your new event. You will be redirected to the dashboard and you will be able to see your new item in the list.
4. If you click on the 3 dots button of any of the cards it will allow you to perform another operation: edit. If you do that you will see a very similar form to the last one but now with the corresponing fields already filled up with the current values. Besides the event type cannot be changed so it the radio buttons are disabled. Edit any of the fields and update your event. You will be redirected to the dashboard again.
5. And last but not least. The other option of the 3 dots button allows you to delete an event. If you do that you will immediately see the result in the dashboard screen.
6. Ah, and if you click on any of the addresses you will open a new tab in your browser with the Google Maps app looking for the indicated address.
