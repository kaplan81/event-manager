import { Component } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';

@Component({
  templateUrl: './event-new.component.html'
})
export class EventNewComponent {
  constructor(private formStateService: FormStateService) {
    this.formStateService.updateFormState(true);
  }
}
