import axios from "axios";
import { toast } from "react-toastify";

export const fetchLogin = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("userName", res.data.user.username);
        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
        });
        toast.success("Login successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE", message: error.message });
        toast.error("These credentials do not match", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};
