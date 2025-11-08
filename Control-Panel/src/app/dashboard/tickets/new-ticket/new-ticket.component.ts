import {
  AfterViewInit,
  Component,
  ElementRef,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent implements AfterViewInit {
  // Accessing #form template variable
  // v17+
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  enteredTitle = '';
  enteredText = '';
  add = output<{ title: string; text: string }>();

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    // this.form().nativeElement.reset();
    // this.form?.nativeElement.reset();
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
