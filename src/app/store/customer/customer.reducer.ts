import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { CustomerState } from './customer.models';

export const initialState: CustomerState = {
  data: null,
  loading: false,
  error: null,
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.load, (state) => ({ ...state, loading: true })),
  on(CustomerActions.loadSuccess, (state, { customer }) => ({
    ...state,
    data: customer,
    loading: false,
    error: null,
  })),
  on(CustomerActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CustomerActions.updateSuccess, (state, { customer }) => ({
    ...state,
    data: customer,
  })),
  on(CustomerActions.emailVerificationSuccess, (state, { verified }) => {
    return {
      ...state,
      data: state.data ? { ...state.data, emailVerified: verified } : null,
    };
  })
);
