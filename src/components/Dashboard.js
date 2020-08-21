import React, { useState, useEffect } from "react";
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
  Label,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import { Header } from "../components";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPaste } from "../redux/actions/addPaste";
import { editPaste } from "../redux/actions/editPaste";
import { getPaste, fetchSinglePaste } from "../redux/actions/getPaste";
import { deletePaste } from "../redux/actions/deletePaste";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import Pagination from "react-js-pagination";

const signupSchema = yup.object().shape({
  newpaste: yup.string().required("Please enter paste description"),
  expiration: yup.string().required("Please enter expiration"),
  exposure: yup.string().required("Please enter exposure"),
  title: yup.string().required("Please enter title"),
});

const Dashboard = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateToggle = () => setUpdateModal(!updateModal);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      addPaste(
        data.newpaste,
        data.expiration,
        data.exposure,
        data.title,
        setModal
      )
    );
  };

  const onSubmitEdit = (data) => {
    dispatch(
      editPaste(
        data.newpaste,
        data.expiration,
        data.exposure,
        data.title,
        data.id,
        setUpdateModal
      )
    );
  };

  const { loading, allpaste, paste } = useSelector((state) => ({
    loading: state.getPasteReducer.loading,
    allpaste: state.getPasteReducer.allpaste,
    paste: state.getPasteReducer.singlePaste.paste,
  }));

  useEffect(() => {
    dispatch(getPaste());
  }, [dispatch]);

  return (
    <>
      <Header></Header>

      <Container>
        <Button color="info" onClick={toggle} className="mt-3">
          Add New Paste
        </Button>

        <Modal isOpen={modal}>
          <ModalHeader toggle={toggle}>New Paste</ModalHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormGroup>
                <Label>New Paste</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="newpaste"
                  type="textarea"
                  placeholder="Enter Paste Description"
                  defaultValue=""
                  ref={register}
                  className={errors && errors.newpaste ? "is-invalid" : ""}
                />
                {errors && errors.newpaste && (
                  <span className="text-danger">{errors.newpaste.message}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label> Paste Expiration </Label>:
                <Controller
                  as={Input}
                  control={control}
                  name="expiration"
                  type="select"
                  ref={register}
                  className={errors && errors.expiration ? "is-invalid" : ""}
                >
                  <option value="">select</option>
                  <option value="aminute">aminute</option>
                  <option value="ahours">ahours</option>
                </Controller>
                {errors && errors.expiration && (
                  <span className="text-danger">
                    {errors.expiration.message}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Paste Exposure</Label> :
                <Controller
                  as={Input}
                  control={control}
                  name="exposure"
                  type="select"
                  ref={register}
                  className={errors && errors.exposure ? "is-invalid" : ""}
                >
                  <option value="">select</option>
                  <option value="public">public </option>
                  <option value="private">private</option>
                  <option value="unlisted">unlisted</option>
                </Controller>
                {errors && errors.exposure && (
                  <span className="text-danger">{errors.exposure.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Title</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="title"
                  type="text"
                  placeholder="Enter paste title"
                  defaultValue=""
                  ref={register}
                  className={errors && errors.title ? "is-invalid" : ""}
                />
                {errors && errors.title && (
                  <span className="text-danger">{errors.title.message}</span>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Add Paste</Button>
              <Button color="secondary" onClick={toggle}>
                cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/**********************update modal ************************/}

        <Modal isOpen={updateModal}>
          <ModalHeader toggle={updateToggle}>Edit Paste</ModalHeader>
          {paste !== null && (
            <Form onSubmit={handleSubmit(onSubmitEdit)}>
              <ModalBody>
                <FormGroup>
                  <Controller
                    as={Input}
                    control={control}
                    name="id"
                    type="hidden"
                    placeholder="Enter Paste Description"
                    defaultValue={paste.id}
                    ref={register}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Edit Paste</Label>
                  <Controller
                    as={Input}
                    control={control}
                    name="newpaste"
                    type="textarea"
                    placeholder="Enter Paste Description"
                    defaultValue={paste.content}
                    ref={register}
                    className={errors && errors.newpaste ? "is-invalid" : ""}
                  />
                  {errors && errors.newpaste && (
                    <span className="text-danger">
                      {errors.newpaste.message}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label> Paste Expiration </Label>:
                  <Controller
                    as={Input}
                    control={control}
                    name="expiration"
                    type="select"
                    ref={register}
                    defaultValue={paste.Expiration}
                    className={errors && errors.expiration ? "is-invalid" : ""}
                  >
                    <option value="">select</option>
                    <option value="aminute">aminute</option>
                    <option value="ahours">ahours</option>
                  </Controller>
                  {errors && errors.expiration && (
                    <span className="text-danger">
                      {errors.expiration.message}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Paste Exposure</Label> :
                  <Controller
                    as={Input}
                    control={control}
                    name="exposure"
                    type="select"
                    ref={register}
                    defaultValue={paste.Exposure}
                    className={errors && errors.exposure ? "is-invalid" : ""}
                  >
                    <option value="">select</option>
                    <option value="public">public </option>
                    <option value="private">private</option>
                    <option value="unlisted">unlisted</option>
                  </Controller>
                  {errors && errors.exposure && (
                    <span className="text-danger">
                      {errors.exposure.message}
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Title</Label>
                  <Controller
                    as={Input}
                    control={control}
                    name="title"
                    type="text"
                    placeholder="Enter paste title"
                    defaultValue={paste.title}
                    ref={register}
                    className={errors && errors.title ? "is-invalid" : ""}
                  />
                  {errors && errors.title && (
                    <span className="text-danger">{errors.title.message}</span>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Update</Button>
                <Button color="secondary" onClick={updateToggle}>
                  cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Modal>

        {/**********************update modal end *******************/}

        <Table striped bordered className="mt-3 border table-data">
          <thead>
            <tr className="table-heading">
              <th>Title</th>
              <th>Content</th>
              <th>Added</th>
              <th>Expires</th>
              <th>Exposure</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="">
            {loading ? (
              <tr>
                <td colspan="6">Loading...</td>
              </tr>
            ) : (
              <>
                {allpaste !== null &&
                  allpaste
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((item) => (
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>
                          <Moment format="MMM DD, YYYY">
                            {item.created_at}
                          </Moment>
                        </td>
                        <td>{item.Expiration}</td>
                        <td>{item.Exposure}</td>
                        <td>
                          <FaTrash
                            onClick={() => dispatch(deletePaste(item.id))}
                          />
                          <FaPencilAlt
                            className="ml-3"
                            onClick={() => {
                              updateToggle();
                              dispatch(fetchSinglePaste(item.id));
                            }}
                          />
                        </td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </Table>
        <div>
          <Pagination
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={10}
          />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
