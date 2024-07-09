/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store/Store";
import axios_common from "../../Services/api";
import { DataEmail } from "../../Services/Interfaces/email";
import toast from "react-hot-toast";
import { MyFormValues } from "../../Services/Interfaces/userInterFace";
import { verficationModel } from "../../Services/Interfaces/otpInterface";
import { resetPassword } from "../../Services/Interfaces/resetPasword";

// Define a type for the slice state

export interface socialUser {
  username: string;
  code: string;
}

// Define a type for the slice state

interface UserState {
  userData: MyFormValues;
  socialLoginData: socialUser;
  errors: {
    loginError: any;
    registerError: any;
    errorSocialMedia: string | undefined;
  };
  loading: {
    loginLoading: boolean;
    loadingRegister: boolean;
    loadingSocialMedia: boolean;
  };
  confirmed: {
    loginConfirmed: boolean;
    registerConfirmed: boolean;
    socialMediaConfirmed: boolean;
  };
  verification: {
    registerVerification: boolean;
    forgetPasswordVerification: boolean;
  };
  userEmail: string;
  isLogged: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  userData: {},
  socialLoginData: {
    code: "",
    username: "",
  },
  errors: {
    loginError: "",
    registerError: "",
    errorSocialMedia: "",
  },
  loading: {
    loginLoading: false,
    loadingRegister: false,
    loadingSocialMedia: false,
  },
  confirmed: {
    loginConfirmed: false,
    registerConfirmed: false,
    socialMediaConfirmed: false,
  },
  verification: {
    registerVerification: false,
    forgetPasswordVerification: false,
  },
  userEmail: "",
  isLogged: false,
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (values: MyFormValues, { rejectWithValue }) => {
    return await axios_common
      .post("register", values)
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const fetchSocialUserData: any = createAsyncThunk(
  "user/fetchSocialUserData",
  async (scialData: socialUser, { rejectWithValue }) => {
    return await axios_common
      .post(`social-auth`, scialData)
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.response?.data.massage));
  }
);

export const verify = createAsyncThunk(
  "user/verify",
  async (optData: verficationModel, { rejectWithValue }) => {
    return await axios_common
      .post("verify-email", optData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const message = err.response?.data.message;
        return rejectWithValue(`'Error': ${message}`);
      });
  }
);

export const resend = createAsyncThunk(
  "user/resend",
  async (resendData: DataEmail, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    return await axios_common
      .post("resend-verify-email", resendData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  }
);

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (user: MyFormValues, { rejectWithValue }) => {
    return await axios_common
      .post("login", user)
      .then(({ data }) => {
        return data.data;
      })
      .catch((err) => {
        if (err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        } else {
          return rejectWithValue(err);
        }
      });
  }
);

export const handleLogout = createAsyncThunk(
  "user/handleLogout",
  async (tokenLocal: string, { rejectWithValue }) => {
    return await axios_common
      .post("/logout", tokenLocal)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); ////////////////////////////////////////////////////
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const handleProfile: any = createAsyncThunk(
  "user/handleProfile",
  async (_, { rejectWithValue }) => {
    return await axios_common
      .get("/me")
      .then(({ data }) => data.data)
      .catch((err) => rejectWithValue(err.responses.data.message));
  }
);
export const handleEditProfile = createAsyncThunk(
  "user/handleEditProfile",
  async (values: MyFormValues, { rejectWithValue }) => {
    delete values.photo;
    return await axios_common
      .post(`/update/${values.id}?_method=PUT`, values)
      .then(({ data }) => data.message)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);
export const handleEditPhotoProfile = createAsyncThunk(
  "user/handleEditPhotoProfile",
  async (values: FormData, { rejectWithValue }) => {
    axios_common.defaults.headers["Content-Type"] = "multipart/form-data";
    return await axios_common
      .post(`/update/${values.get("id")}`, values)
      .then(({ data }) => data.message)
      .catch((err) => rejectWithValue(err.response.data.message));
  }
);

export const forgetPassword: any = createAsyncThunk(
  "user/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    return await axios_common
      .post("forget-password", { email })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          const data = err.response.data.message;
          const errorKey: any = Object.keys(data).at(0);
          const message = data[errorKey][0];
          return rejectWithValue(`${errorKey}: ${message}`);
        } else {
          return err;
        }
      });
  }
);

export const setNewPassword = createAsyncThunk(
  "user/setNewPassword",
  async (resendData: resetPassword, { rejectWithValue }) => {
    return await axios_common
      .post("reset-password", resendData)
      .then(({ data }) => data)
      .catch((err) => {
        if (err.response?.data.errors) {
          const data = err.response.data.message;
          const errorKey: any = Object.keys(data).at(0);
          const message = data[errorKey][0];
          return rejectWithValue(`${errorKey}: ${message}`);
        } else {
          return err;
        }
      });
  }
);

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.loginError = "";
      state.errors.registerError = "";
      state.errors.errorSocialMedia = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.userData = action.payload;
        localStorage.setItem("token", action.payload.access_token);
        state.confirmed.loginConfirmed = true;
        state.isLogged = true;
        state.loading.loginLoading = false;
        toast.success("You have been logged in successfully");
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading.loginLoading = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        // toast.error("Password or email is invalid");
        state.errors.loginError = action.payload;
        state.loading.loginLoading = false;
        state.isLogged = false;
      });

    builder
      .addCase(handleProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLogged = true;
      })
      .addCase(handleProfile.pending, () => {
        // console.log(state, "pending");
      })
      .addCase(handleProfile.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.errors.loginError = `${action.payload}`;
        state.isLogged = false;
      });

    builder
      .addCase(handleLogout.fulfilled, (state) => {
        state.confirmed.loginConfirmed = false;
        state.userData = {};
        state.isLogged = false;
      })
      .addCase(handleLogout.pending, (state) => {
        console.log(state, "pending");
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.errors.loginError = `${action.payload}`;
        state.isLogged = true;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.loading.loadingRegister = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading.loadingRegister = false;
        state.confirmed.registerConfirmed = true;
        const currentTime = new Date();
        const editedTime = currentTime.getTime() + 2 * 60 * 1000;
        localStorage.setItem("verficationCodeTime", JSON.stringify(editedTime));
        if (action.payload.success) {
          localStorage.setItem("userEmail", action.payload.data.email);
          state.userEmail = action.payload.data.email;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.errors.registerError = action.payload;
        state.loading.loadingRegister = false;
        // toast.error(`${action.payload}`);
      });

    builder
      .addCase(verify.pending, (_, action) => {
        console.log("Pending", action);
      })
      .addCase(verify.fulfilled, (_, action) => {
        localStorage.removeItem("verficationCodeTime");
        if (action.payload.success) {
          // toast.success(action.payload.message);
        } else {
          // toast.error(action.payload.message);
        }
        localStorage.removeItem("role");
      })
      .addCase(verify.rejected, (state, action) => {
        state.errors.loginError = action.payload;
      });

    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading.loginLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        const currentTime = new Date();
        const editedTime = currentTime.getTime() + 2 * 60 * 1000;
        state.loading.loginLoading = false;
        localStorage.setItem("verficationCodeTime", JSON.stringify(editedTime));
        localStorage.setItem("userEmail", action.payload.data.email);
        state.verification.forgetPasswordVerification = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading.loginLoading = false;
        state.errors.loginError = action.payload;
        // toast.error("Password or email is invalid");
        // toast.error(action.payload as string);
      });

    builder
      .addCase(resend.pending, (_, action) => {
        console.log("Pending", action);
      })
      .addCase(resend.fulfilled, (state, action) => {
        state.errors.loginError = action.payload;
        const currentTime = new Date();
        const editedTime = currentTime.getTime() + 2 * 60 * 1000;
        localStorage.setItem("verficationCodeTime", JSON.stringify(editedTime));
      })
      .addCase(resend.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      });

    builder
      .addCase(setNewPassword.pending, (state) => {
        state.loading.loginLoading = true;
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.loading.loginLoading = false;
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");
        localStorage.removeItem("verficationCodeTime");
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading.loginLoading = false;
        toast.error(action.error.message as string);
      });

    //socialMedia

    builder
      .addCase(fetchSocialUserData.pending, (state) => {
        state.loading.loadingSocialMedia = true;
      })
      .addCase(fetchSocialUserData.fulfilled, (state, action) => {
        const userInfo: MyFormValues = action.payload;
        state.userData = userInfo;
        state.isLogged = true;
        localStorage.setItem("token", `${userInfo?.access_token}`);
        state.loading.loadingSocialMedia = false;
        state.confirmed.socialMediaConfirmed = true;
      })
      .addCase(fetchSocialUserData.rejected, (state, action) => {
        state.loading.loadingSocialMedia = false;
        state.isLogged = false;
        state.socialLoginData = {
          code: "",
          username: "",
        };
        state.errors.errorSocialMedia = action.error.message;
      });
  },
});

// export const { login } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userData = (state: RootState) => state.user.userData;
export const Loading = (state: RootState) => state.user.loading;
export const Confirmed = (state: RootState) => state.user.confirmed;
export const UserEmail = (state: RootState) => state.user.userEmail;
export const Errors = (state: RootState) => state.user.errors;
export const UserVerification = (state: RootState) => state.user.verification;
export const User = (state: RootState) => state.user;
// export const cartActions = cartSlice.actions;
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
