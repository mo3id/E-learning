import { redirect } from "react-router-dom";
import { handleProfile } from "../Redux/Slices/UserSlice";
import { store } from "../Redux/Store/Store";
import { fetchCourses } from "../Redux/Slices/CourseSlice";

export const getAuthToken = () => {
  const token =
    store.getState().user.userData.access_token ||
    localStorage.getItem("token");
  return token;
};

export const getRole = () => {
  const roleFromLocalStorage = localStorage.getItem("role");

  if (!roleFromLocalStorage) {
    return redirect("/");
  }

  const token = getAuthToken();
  if (token) {
    return redirect("/");
  }

  return true;
};

export const verifyEmail = () => {
  const verifyEmail = localStorage.getItem("userEmail");

  if (!verifyEmail) {
    return redirect("/");
  } else return null;
  // return null
};

export const loginLoader = () => {
  const token = getAuthToken();
  if (token) {
    return redirect("/");
  } else return null;
  // return null
};
export const presistLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  } else return null;
  // return null
};

export const indexLoader = async () => {
  const token = localStorage.getItem("token") || "";

  if (token) {
    await store.dispatch(handleProfile()).unwrap();
  }
  return null;
};

export const courserLoader = async () => {

    await store.dispatch(fetchCourses()).unwrap();
 
  return null;
};
