import React from "react";
import { Form, Input, Container, Button, FormGroup, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/actions/login";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
const signupSchema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  pwd: yup.string().required("Please enter password"),
});

const Home = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const accessToken = localStorage.getItem("token");

  const onSubmit = (data) => {
    dispatch(fetchLogin(data.username, data.pwd, history));
  };

  return accessToken ? (
    <Redirect to="/dashboard" />
  ) : (
    <Container fluid={true}>
      <Row className="background">
        <Container className="main-container " fluid={true}>
          <h2 className="text-center mb-4 text-white">Login</h2>
          <Form
            className="form-layout"
            onSubmit={handleSubmit(onSubmit)}
            id="myform"
          >
            <FormGroup>
              <Controller
                as={Input}
                control={control}
                name="username"
                type="text"
                placeholder="Username"
                defaultValue=""
                ref={register}
                className={errors && errors.username ? "is-invalid" : ""}
              />
              {errors && errors.username && (
                <span className="text-danger">{errors.username.message}</span>
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
            <FormGroup>
              <Button className="submit-btn" name="submit">
                Sign In
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default Home;
