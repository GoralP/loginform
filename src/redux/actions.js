import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
          identifier: res.data.identifier,
          password: res.data.password,
        });
        toast.success("Login successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        toast.error("fail", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

export const addPaste = (content, expiration, exposure, title) => {
  const jwt = localStorage.getItem("token");
  console.log(jwt);
  return (dispatch) => {
    dispatch({ type: "ADDPASTE_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/pastes", {
        content: content,
        expiration: expiration,
        exposure: exposure,
        title: title,

        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) =>
        dispatch({
          type: "ADDPASTE_SUCCESS",

          content: content,
          expiration: expiration,
          exposure: exposure,
          title: title,

          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
      );
  };
};
