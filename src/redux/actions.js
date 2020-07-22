import axios from "axios";

export const fetchLogin = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
          identifier: res.data.identifier,
          password: res.data.password,
        });

        history.push("/dashboard");
      });
  };
};
