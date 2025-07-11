import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerActions } from './customer.actions';
import { CustomerService } from '../../services/customer.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private service = inject(CustomerService);

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.load),
      mergeMap(() =>
        this.service.getCustomer().pipe(
          map((customer) => CustomerActions.loadSuccess({ customer })),
          catchError((err) =>
            of(CustomerActions.loadFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.update),
      mergeMap(({ customer }) =>
        this.service.updateCustomer(customer).pipe(
          map(() => CustomerActions.updateSuccess({ customer })),
          catchError((err) =>
            of(CustomerActions.updateFailure({ error: err.message }))
          )
        )
      )
    )
  );

  verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.verifyEmail, CustomerActions.unverifyEmail),
      mergeMap((action) =>
        this.service
          .toggleEmailVerification(
            action.type === CustomerActions.verifyEmail.type
          )
          .pipe(
            tap((res) => console.log('EMAIL VERIFY RESPONSE:', res)), // 👈 Lisa see
            map((res) =>
              CustomerActions.emailVerificationSuccess({
                verified: res.verified,
              })
            ),
            catchError((err) =>
              of(CustomerActions.updateFailure({ error: err.message }))
            )
          )
      )
    )
  );
}
