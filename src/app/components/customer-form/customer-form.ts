import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import {
  selectCustomer,
  selectLoading,
} from '../../store/customer/customer.selectors';
import { CustomerActions } from '../../store/customer/customer.actions';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  issuingCountries = ['EE', 'FI', 'LV', 'LT'];
  birthCountries = ['Estonia', 'Finland', 'Latvia', 'Lithuania'];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    idCode: ['', Validators.required],
    idCountry: ['EE', Validators.required],
    birthDate: [''],
    birthCountry: [''],
    email: [''],
    emailVerified: [false],
  });

  customer$ = this.store.select(selectCustomer);
  loading$ = this.store.select(selectLoading);

  isEstonianId = computed(() => this.form.get('idCountry')?.value === 'EE');

  ngOnInit() {
    this.store.dispatch(CustomerActions.load());

    this.customer$.subscribe((customer) => {
      if (customer) this.form.patchValue(customer);
    });

    this.form.get('idCountry')?.valueChanges.subscribe((code) => {
      if (code === 'EE') {
        this.form.get('birthDate')?.reset();
        this.form.get('birthCountry')?.reset();
      }
    });
  }

  verifyEmail() {
    this.store.dispatch(CustomerActions.verifyEmail());
  }

  unverifyEmail() {
    this.store.dispatch(CustomerActions.unverifyEmail());
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        CustomerActions.update({
          customer: this.form.getRawValue() as Customer,
        })
      );
    }
  }
}
