import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from './customer.models';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ customer: Customer }>(),
    'Load Failure': props<{ error: string }>(),
    'Update': props<{ customer: Customer }>(),
    'Update Success': props<{ customer: Customer }>(),
    'Update Failure': props<{ error: string }>(),
    'Verify Email': emptyProps(),
    'Unverify Email': emptyProps(),
    'Email Verification Success': props<{ verified: boolean }>(),
  },
});
