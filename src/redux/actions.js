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
        localStorage.setItem("tokenn", res.data.user.username);

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
        toast.error("These credentials do not match", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };
};

export const addPaste = (content, expiration, exposure, title) => {
  const getToken = localStorage.getItem("token");

  // console.log(getToken);
  return (dispatch) => {
    dispatch({ type: "ADDPASTE_PENDING" });

    axios
      .post(
        "https://pastebindemo.herokuapp.com/pastes",
        {
          content: content,
          Expiration: expiration,
          Exposure: exposure,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "ADDPASTE_SUCCESS",
          paste: res.data.data,
        });
        toast.success("New paste added successfully!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });

        window.location.reload();
      })
      .catch((error) => {
        // console.log(error);
        dispatch({ type: "ADDPASTE_FAILURE", message: error.res });
      });
  };
};

export const getPaste = () => {
  const getToken = localStorage.getItem("token");
  // console.log(getToken);
  return (dispatch) => {
    dispatch({ type: "GETPASTE_PENDING" });

    axios
      .get("https://pastebindemo.herokuapp.com/pastes", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({ type: "GETPASTE_SUCCESS", allpaste: res.data });
      })

      .catch((error) => {
        // console.log(error);
        dispatch({ type: "GETPASTE_FAILURE", message: error.res });
      });
  };
};
