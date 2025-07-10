import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-customer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  issuingCountries = ['EE', 'FI', 'LV', 'LT'];
  birthCountries = ['Estonia', 'Finland', 'Latvia', 'Lithuania'];
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCode: ['', Validators.required],
      idCountry: ['EE', Validators.required],
      birthDate: [''],
      birthCountry: [''],
      email: [''],
      emailVerified: [false],
    });
  }

  get isEstonianId(): boolean {
    return this.form.get('idCountry')?.value === 'EE';
  }

  verifyEmail() {
    this.form.patchValue({ emailVerified: true });
  }

  unverifyEmail() {
    this.form.patchValue({ emailVerified: false });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
