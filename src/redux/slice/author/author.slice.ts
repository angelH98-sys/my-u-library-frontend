import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: null,
  formData: null,
  isExecutingRequest: false,
  records: null,
  status: null,
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setBookInitialState: (state) => {
      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = null;
      state.status = null;
    },
    executingAuthorQuery: (state, { payload = {} }) => {
      const { formData } = payload;

      state.errors = null;
      state.formData = formData;
      state.isExecutingRequest = true;
      state.records = null;
      state.status = null;
    },
    authorQuerySucceed: (
      state,
      action = {
        payload: undefined,
        type: "",
      }
    ) => {
      const { records = null, status = 200 } = action.payload;

      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = records;
      state.status = status;
    },
    authorQueryFailed: (
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
      state.status = status;
    },
  },
});
export const {
  executingAuthorQuery,
  authorQuerySucceed,
  authorQueryFailed,
  setBookInitialState,
} = authorSlice.actions;
