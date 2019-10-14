import { Component } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'evm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNewEventBtn = true;

  constructor(private formStateService: FormStateService) {
    this.formStateService.formState$.subscribe(
      (showingForm: boolean) => (this.showNewEventBtn = !showingForm)
    );
  }
}
