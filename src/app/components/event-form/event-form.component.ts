import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
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
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class EventFormComponent implements OnChanges, OnDestroy {
  @Input() event: Event;

  destroyed$ = new Subject<boolean>();

  times: string[] = TIMES;

  submitButtonText = 'Save';

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
    address: [null]
  });

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.eventForm
      .get('type')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((type: 'meeting' | 'call') => {
        const participants: FormArray =
          type === 'meeting'
            ? this.setParticipants('meeting')
            : this.setParticipants('call');
        this.eventForm.removeControl('participants');
        this.eventForm.setControl('participants', participants);
        console.log(this.eventForm);
        // tslint:disable-next-line: no-string-literal
        const address: AbstractControl = this.eventForm.controls['address'];

        if (type === 'meeting') {
          address.setValidators(Validators.required);
        } else {
          address.setValidators(null);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'event') {
        this.submitButtonText = 'Update';
        const event: Event = changes[propName].currentValue;
        if (event !== null) {
          const time: string = moment(event.date * 1000).format('HH:mm');
          this.eventForm = this.fb.group({
            name: [event.name, Validators.required],
            type: [event.type, Validators.required],
            date: [moment(event.date * 1000), Validators.required],
            time: [time, Validators.required],
            participants: this.setParticipants(
              event.type,
              ...event.participants
            ),
            address: [null]
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get participants(): FormArray {
    return this.eventForm.get('participants') as FormArray;
  }

  isMeeting(): boolean {
    return this.eventForm.value.type === 'meeting';
  }

  onSubmit(): void {
    const formVal: any = this.eventForm.value;
    const type: 'meeting' | 'call' = formVal.type;
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

    const newEvent: Event = {
      id: null,
      type,
      name,
      created,
      date,
      participants,
      address
    };

    if (this.event) {
      this.eventService
        .editEvent(this.event.id, newEvent)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(val => this.router.navigate(['dashboard']));
    } else {
      this.eventService
        .createEvent(newEvent)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(val => this.router.navigate(['dashboard']));
    }
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

  private setParticipants(
    type: 'meeting' | 'call',
    ...participants: string[]
  ): FormArray {
    let participantsCount: number = type === 'meeting' ? 3 : 2;
    if (participants) {
      participantsCount = participants.length;
    }
    const array: any[] = new Array(participantsCount);
    const participantsValidator: ValidationErrors =
      type === 'meeting'
        ? Validators.required
        : Validators.compose([Validators.required, Validators.email]);
    let participantsControlList: FormControl[];

    if (participants) {
      participantsControlList = Array.from(array, (val: any, i: number) => {
        return this.fb.control(participants[i], participantsValidator);
      });
    } else {
      participantsControlList = Array.from(array, (val: any, i: number) => {
        return this.fb.control('', participantsValidator);
      });
    }

    return this.fb.array(participantsControlList);
  }
}
