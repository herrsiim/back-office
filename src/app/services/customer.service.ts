import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Customer } from '../store/customer/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private mockCustomer: Customer = {
    firstName: 'Siim',
    lastName: 'Raudsepp',
    idCode: '39012241234',
    idCountry: 'EE',
    birthDate: '1990-12-24',
    birthCountry: 'Estonia',
    email: 'raudsepp@lhv.ee',
    emailVerified: false,
  };

  /**
   * Retrieves the customer information.
   * GET mock.
   * @returns An observable that emits the mock customer data after a delay.
   */
  getCustomer(): Observable<Customer> {
    return of(this.mockCustomer).pipe(delay(500));
  }

  /**
   * Updates the customer information.
   * PUT mock.
   * @param customer - The customer object containing updated information.
   * @returns An observable that emits void after a delay.
   */
  updateCustomer(customer: Customer): Observable<void> {
    this.mockCustomer = { ...customer };
    return of(void 0).pipe(delay(300));
  }

  /**
   * Toggles the email verification status of the customer.
   * POST mock.
   * @param verify - If true, sets emailVerified to true; if false, sets it to false.
   * @returns An observable that emits the new verification status after a delay.
   */
  toggleEmailVerification(verify: boolean): Observable<{ verified: boolean }> {
    this.mockCustomer = {
      ...this.mockCustomer,
      emailVerified: verify,
    };
    return of({ verified: verify }).pipe(delay(200));
  }
}
