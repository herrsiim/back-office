import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.models';

export const selectCustomerState =
  createFeatureSelector<CustomerState>('customer');

export const selectCustomer = createSelector(
  selectCustomerState,
  (state) => state.data
);

export const selectLoading = createSelector(
  selectCustomerState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCustomerState,
  (state) => state.error
);
