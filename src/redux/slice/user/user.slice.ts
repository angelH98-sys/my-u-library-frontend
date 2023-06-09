import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: null,
  formData: null,
  isExecutingRequest: false,
  records: null,
  _metadata: null,
  status: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInitialState: (state) => {
      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = null;
      state._metadata = null;
      state.status = null;
    },
    executingUserQuery: (state, { payload = {} }) => {
      const { formData } = payload;

      state.errors = null;
      state.formData = formData;
      state.isExecutingRequest = true;
      state.records = null;
      state._metadata = null;
      state.status = null;
    },
    userQuerySucceed: (
      state,
      action = {
        payload: undefined,
        type: "",
      }
    ) => {
      const { records = null, _metadata = null, status = 200 } = action.payload;

      state.errors = null;
      state.formData = null;
      state.isExecutingRequest = false;
      state.records = records;
      state._metadata = _metadata;
      state.status = status;
    },
    userQueryFailed: (
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
  setUserInitialState,
  executingUserQuery,
  userQuerySucceed,
  userQueryFailed,
} = userSlice.actions;
