import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Customer } from '../store/customer/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private mockCustomer: Customer = {
    firstName: 'Mari',
    lastName: 'Maasikas',
    idCode: '47101010001',
    idCountry: 'EE',
    email: 'mari@lhv.ee',
    emailVerified: true,
  };

  getCustomer(): Observable<Customer> {
    return of(this.mockCustomer).pipe(delay(500));
  }

  updateCustomer(customer: Customer): Observable<void> {
    this.mockCustomer = { ...customer };
    return of(void 0).pipe(delay(300));
  }

  toggleEmailVerification(verify: boolean): Observable<{ verified: boolean }> {
    this.mockCustomer.emailVerified = verify;
    return of({ verified: verify }).pipe(delay(200));
  }
}
