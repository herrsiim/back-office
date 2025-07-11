import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Store } from '@ngrx/store';
import { Customer } from '../../store/customer/customer.models';
import { selectCustomer } from '../../store/customer/customer.selectors';
import { CustomerActions } from '../../store/customer/customer.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  isEstonianId = true;
  issuingCountries: string[] = ['EE', 'FI', 'LV', 'LT'];
  birthCountries: string[] = ['Estonia', 'Finland', 'Latvia', 'Lithuania'];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    idCode: ['', Validators.required],
    idCountry: ['EE', Validators.required],
    birthDate: ['', Validators.required],
    birthCountry: ['', Validators.required],
    email: [''],
    emailVerified: [false],
  });

  customer$ = this.store.select(selectCustomer);

  ngOnInit() {
    this.store.dispatch(CustomerActions.load());

    this.customer$.subscribe((customer) => {
      if (customer) {
        this.form.patchValue(customer);
        this.isEstonianId = customer.idCountry === 'EE';
      }
    });

    this.form.get('idCountry')?.valueChanges.subscribe((code) => {
      this.isEstonianId = code === 'EE';
      if (code === 'EE') {
        this.form.get('birthCountry')!.setValue('Estonia');
        this.form.get('birthDate')?.reset();

        const idCode = this.form.get('idCode')!.value;
        if (idCode && idCode.length === 11) {
          const birthDate = this.extractBirthDateFromEstonianId(idCode);
          this.form.get('birthDate')!.setValue(birthDate);
        }
      } else {
        this.form.get('birthCountry')?.reset();
        this.form.get('birthDate')?.reset();
      }
    });

    this.form.get('idCode')?.valueChanges.subscribe((code) => {
      const country = this.form.get('idCountry')!.value;
      if (country === 'EE' && code && code.length === 11) {
        const birthDate = this.extractBirthDateFromEstonianId(code);
        if (birthDate) {
          this.form.get('birthDate')!.setValue(birthDate);
          this.form.get('birthCountry')!.setValue('Estonia');
        }
      }
    });
  }

  extractBirthDateFromEstonianId(idCode: string): string | null {
    if (!/^\d{11}$/.test(idCode)) return null;

    const centuryCode = parseInt(idCode[0], 10);
    const year = parseInt(idCode.slice(1, 3), 10);
    const month = parseInt(idCode.slice(3, 5), 10);
    const day = parseInt(idCode.slice(5, 7), 10);

    const century = centuryCode < 3 ? 1800 : centuryCode < 5 ? 1900 : 2000;
    const fullYear = century + year;

    const paddedMonth = String(month).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');

    return `${fullYear}-${paddedMonth}-${paddedDay}`;
  }

  verifyEmail() {
    this.store.dispatch(CustomerActions.verifyEmail());
  }

  unverifyEmail() {
    this.store.dispatch(CustomerActions.unverifyEmail());
  }

  onSubmit() {
    const customer = this.form.getRawValue() as Customer;
    if (this.form.valid) {
      this.store.dispatch(CustomerActions.update({ customer }));
      this.store
        .select(selectCustomer)
        .pipe(take(1))
        .subscribe((updatedCustomer) => {
          if (updatedCustomer) {
            this.snackBar.open('Details updated successfully!', 'Close', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('Failed to update details.', 'Close', {
              duration: 3000,
            });
          }
        });
    }
  }
}
