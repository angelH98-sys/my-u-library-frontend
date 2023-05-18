import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: null,
  formData: null,
  isExecutingRequest: false,
  records: null,
  _metadata: null,
  status: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    executingBookQuery: (state, { payload = {} }) => {
      const { formData } = payload;

      state.errors = null;
      state.formData = formData;
      state.isExecutingRequest = true;
      state.records = null;
      state._metadata = null;
      state.status = null;
    },
    bookQuerySucceed: (
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
    bookQueryFailed: (
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
export const { executingBookQuery, bookQuerySucceed, bookQueryFailed } =
  bookSlice.actions;
