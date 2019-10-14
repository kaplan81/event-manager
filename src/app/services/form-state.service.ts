import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const initialFormState = false;

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  formState$: Observable<boolean>;

  private state: boolean = initialFormState;
  private dispatch$ = new BehaviorSubject<boolean>(this.state);

  constructor() {
    this.formState$ = this.dispatch$.asObservable();
  }

  updateFormState(showingForm: boolean): void {
    this.dispatch$.next((this.state = showingForm));
  }
}
