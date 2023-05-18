import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: null,
  formData: null,
  isExecutingRequest: false,
  records: null,
  _metadata: null,
  status: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutDefaultValues: (state) => {
      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = null;
      state._metadata = null;
      state.status = null;
    },
    executingCheckoutQuery: (state, { payload = {} }) => {
      const { formData } = payload;

      state.errors = null;
      state.formData = formData;
      state.isExecutingRequest = true;
      state.records = null;
      state._metadata = null;
      state.status = null;
    },
    checkoutQuerySucceed: (
      state,
      action = {
        payload: undefined,
        type: "",
      }
    ) => {
      const { records = null, status = 200, _metadata = null } = action.payload;

      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = records;
      state._metadata = _metadata;
      state.status = status;
    },
    checkoutQueryFailed: (
      state,
      action = {
        payload: undefined,
        type: "",
      }
    ) => {
      const { errors = null, status = 400 } = action.payload;

      state.errors = errors;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = null;
      state._metadata = null;
      state.status = status;
    },
  },
});
export const {
  executingCheckoutQuery,
  checkoutQuerySucceed,
  checkoutQueryFailed,
  setCheckoutDefaultValues,
} = checkoutSlice.actions;
