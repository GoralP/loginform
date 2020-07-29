import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  Container,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Header } from "../components";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPaste, getPaste } from "../redux/actions";
import Moment from "react-moment";

const SignupSchema = yup.object().shape({
  newPaste: yup.string().required(),
  expiration: yup.string().required(),
  exposure: yup.string().required(),
});

const Dashboard = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(
      addPaste(data.newPaste, data.expiration, data.exposure, data.title)
    );
    // dispatch(getPaste());
  };

  const { allpaste } = useSelector((state) => ({
    allpaste: state.loginReducer.getpaste.allpaste,
  }));
  console.log(allpaste);

  useEffect(() => {
    dispatch(getPaste());
  }, [dispatch]);

  return (
    <Container fluid="fluid">
      <Header></Header>

      <Button color="info" onClick={toggle} className="mt-3">
        Add New Paste
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Paste</ModalHeader>
        <ModalBody>
          <Form
            className="form-layout"
            onSubmit={handleSubmit(onSubmit)}
            id="myform"
          >
            <FormGroup>
              New Paste
              <Controller
                as={Input}
                control={control}
                name="newPaste"
                type="textarea"
                placeholder="Enter Paste Description"
                defaultValue=""
                ref={register}
                className={errors && errors.newPaste ? "is-invalid" : ""}
              />
              {errors && errors.newPaste && (
                <span className="text-danger">{errors.newPaste.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              Paste Expiration :
              <Controller
                as={Input}
                control={control}
                name="expiration"
                type="select"
                defaultValue=""
                ref={register}
                className={errors && errors.expiration ? "is-invalid" : ""}
              >
                <option>select</option>
                <option>aminute</option>
                <option>ahours</option>
              </Controller>
              {errors && errors.expiration && (
                <span className="text-danger">{errors.expiration.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              Paste Exposure :
              <Controller
                as={Input}
                control={control}
                name="exposure"
                type="select"
                defaultValue=""
                ref={register}
                className={errors && errors.exposure ? "is-invalid" : ""}
              >
                <option>select</option>
                <option>public </option>
                <option>private</option>
                <option>unlisted</option>
              </Controller>
              {errors && errors.exposure && (
                <span className="text-danger">{errors.exposure.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              Title
              <Controller
                as={Input}
                control={control}
                name="title"
                type="text"
                placeholder="title"
                defaultValue=""
                ref={register}
                className={errors && errors.title ? "is-invalid" : ""}
              />
              {errors && errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </FormGroup>
            <Button color="secondary" type="submit" onClick={toggle}>
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Table className="mt-5">
        <thead>
          <tr>
            <th>NAME/TITLE</th>
            <th>ADDED</th>
            <th>EXPIRES</th>
          </tr>
        </thead>
        <tbody>
          {allpaste !== null &&
            allpaste
              .slice()
              .reverse()
              .map((item, index) => (
                <tr key={index} className="li">
                  <td>{item.title}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{item.created_at}</Moment>
                  </td>
                  <td>{item.Expiration}</td>
                  {/* <td>{item.title}</td> */}
                </tr>
              ))}{" "}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
