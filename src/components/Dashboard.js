import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  Container,
  FormGroup,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  newPaste: yup.string().required(),
  expiration: yup.string().required(),
  exposure: yup.string().required(),
});

const Dashboard = () => {
  const { control, register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = (values) => {
    console.log(values);
    reset({ newPaste: "" });
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
                // className={errors && errors.expiration ? "is-invalid" : ""}
              >
                <option>Never</option>
                <option value="BackLog">10 Minutes</option>
                <option value="In Progress">1 Hour</option>
                <option value="Done">1 Day</option>
                <option value="Done">1 Week</option>
                <option value="Done">2 Weeks</option>
                <option value="Done">1 Month</option>
                <option value="Done">6 Months</option>
                <option value="Done">1 Year</option>
              </Controller>
              {/* {errors && errors.expiration && (
            <span className="text-danger">{errors.expiration.message}</span>
          )} */}
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
                // className={errors && errors.exposure ? "is-invalid" : ""}
              >
                <option>Select</option>
                <option value="BackLog">Public</option>
                <option value="In Progress">Private</option>
              </Controller>
              {/* {errors && errors.exposure && (
            <span className="text-danger">{errors.exposure.message}</span>
          )} */}
            </FormGroup>
            <Button color="secondary" onClick={toggle}>
              Add
            </Button>
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
