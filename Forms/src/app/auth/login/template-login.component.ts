import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-template-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-login.component.html',
  styleUrl: './login.component.css',
})
export class TemplateLoginComponent {
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-loign-form');

      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail);
        }, 1);
      }

      const subscription = this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'saved-loign-form',
              JSON.stringify({ email: value.email })
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    const email = formData.form.value.email;
    const password = formData.form.value.password;

    formData.form.reset();
  }
}
