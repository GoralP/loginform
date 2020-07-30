import React from "react";
import { Form, Input, Container, Button, FormGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/actions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

const SignupSchema = yup.object().shape({
  userName: yup.string().required("Please Enter username"),
  pwd: yup.string().required("Please enter password"),
});

const Login = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const accessToken = localStorage.getItem("token");

  const onSubmit = (data) => {
    dispatch(fetchLogin(data.userName, data.pwd, history));
  };

  return accessToken ? (
    <Redirect to="/dashboard" />
  ) : (
    <Container className="main-container bg-info" fluid="fluid">
      <h2 className="text-center mb-4">Login</h2>
      <Form
        className="form-layout"
        onSubmit={handleSubmit(onSubmit)}
        id="myform"
      >
        <FormGroup>
          <Controller
            as={Input}
            control={control}
            name="userName"
            type="text"
            placeholder="Username"
            defaultValue=""
            ref={register}
            className={errors && errors.userName ? "is-invalid" : ""}
          />
          {errors && errors.userName && (
            <span className="text-danger">{errors.userName.message}</span>
          )}
        </FormGroup>

        <FormGroup>
          <Controller
            as={Input}
            control={control}
            name="pwd"
            type="password"
            placeholder="Password"
            defaultValue=""
            ref={register}
            className={errors && errors.pwd ? "is-invalid" : ""}
          />
          {errors && errors.pwd && (
            <span className="text-danger">{errors.pwd.message}</span>
          )}
        </FormGroup>

        <Button className="bg-secondary" name="submit">
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
