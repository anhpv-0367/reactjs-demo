import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
  value: "",
  user_name: "",
  result: "",
  repos: [],
  size: 5,
  page: 1,
  paginate_flag: true,
  loading: false,
  pending_flag: false
};
export const store = createStore(reducer, initialState);
