import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store/Store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// use those instead of useDispatch and useSelector because of Typescript
// const dispatch = useAppDispatch()  >>> to change in the state
// const {} = useAppSelector((state) => state.exSlice)  >>>>> to destruct the states
