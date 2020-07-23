import React, { useState } from "react";
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
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addPaste } from "../redux/actions";

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
    dispatch(addPaste(data.newPaste, data.expiration, data.exposure));
  };

  return (
    <Container fluid="fluid">
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
                placeholder="Username"
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
                <option>Never</option>
                <option>10 Minutes</option>
                <option>1 Hour</option>
                <option>1 Day</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>6 Months</option>
                <option>1 Year</option>
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
                <option>Select</option>
                <option>Public</option>
                <option>Private</option>
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
            <Button color="secondary">Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
      <Table className="mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Added</th>
            <th>Expires</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

export default Dashboard;
