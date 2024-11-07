import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parents-login',
  templateUrl: './parents-login.component.html',
})
export class ParentsLoginComponent {
  form = new FormGroup(
    {
      studentAdmissionId: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
    },
    { updateOn: 'submit' }
  );

  public onSubmit($event: SubmitEvent): void {
    $event.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }
}
