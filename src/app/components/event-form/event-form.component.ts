import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import * as moment from 'moment';
import { Event } from 'src/app/models/event.model';
import { EVM_DATE_FORMAT, TIMES } from '../../date-format';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'evm-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: EVM_DATE_FORMAT }
  ]
})
export class EventFormComponent {
  times: string[] = TIMES;

  eventForm = this.fb.group({
    name: ['', Validators.required],
    type: ['meeting', Validators.required],
    date: [moment(), Validators.required],
    time: ['', Validators.required],
    participants: this.fb.array([
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required)
    ]),
    address: ['']
  });

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm
      .get('type')
      .valueChanges.subscribe((type: 'meeting' | 'call') => {
        const participants: FormArray =
          type === 'meeting'
            ? this.setParticipants('meeting')
            : this.setParticipants('call');
        this.eventForm.setControl('participants', participants);
        // tslint:disable-next-line: no-string-literal
        const address: AbstractControl = this.eventForm.controls['address'];

        if (type === 'meeting') {
          address.setValidators(Validators.required);
        } else {
          address.setValidators(null);
        }
      });
  }

  get participants(): FormArray {
    return this.eventForm.get('participants') as FormArray;
  }

  isMeeting(): boolean {
    return this.eventForm.value.type === 'meeting';
  }

  onSubmit(): void {
    const formVal: any = this.eventForm.value;
    const type: string = formVal.type;
    const name: string = formVal.name;
    const participants: string[] = formVal.participants;
    const created: number = moment().unix();
    const momentDate: moment.Moment = formVal.date;
    const year: number = momentDate.year();
    const month: number = momentDate.month();
    const day: number = momentDate.date();
    const hour: number = +this.eventForm.value.time.split(':')[0];
    const minute: number = +this.eventForm.value.time.split(':')[1];
    const date: number = moment([year, month, day, hour, minute]).unix();
    const address: string | null = formVal.address;

    const event: Event = {
      id: null,
      type,
      name,
      created,
      date,
      participants,
      address
    };

    console.log('event:::', event);
  }

  participantPlaceholder(i: number): string {
    const beginning = `Participant 0${i + 1}`;
    return this.eventForm.value.type === 'meeting'
      ? `${beginning} Name`
      : `${beginning} Email`;
  }

  toString(formControlName: number): string {
    return formControlName.toString();
  }

  private setParticipants(type: 'meeting' | 'call'): FormArray {
    const participantsCount: number = type === 'meeting' ? 3 : 2;
    const participantsValidator: ValidationErrors =
      type === 'meeting'
        ? Validators.required
        : Validators.compose([Validators.required, Validators.email]);
    const participantsControlList: FormControl[] = new Array(
      participantsCount
    ).fill(this.fb.control('', participantsValidator));

    return this.fb.array(participantsControlList);
  }
}
