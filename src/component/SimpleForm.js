import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import transformer from "../helper/transformer";
import * as yup from "yup";
import "./Form.css";

const SimpleForm = () => {
  const apiLink = "https://xyz.in/api/user";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log("====================================");
    // console.log(transformer(data));
    // console.log("====================================");
    axios.post(apiLink, transformer(data)).then((response) => this.setState());
  };

  const addPhoneNumber = () => {
    console.log("====================================");
    console.log("clicks");
    console.log("====================================");
  };

  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      phoneNumber: yup.number().positive().integer().required(),
      zip: yup.number().positive().integer().required(),
    })
    .required();

  return (
    <div className="container">
      <h3 style={{ marginBottom: "100px", textAlign: "center" }}>
        Bank Account Registration Form
      </h3>

      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>Account Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          className="mb-3"
          {...register("account", { required: "This is required." })}
        >
          <option>Select Account Type</option>
          <option value="1">Savings Account</option>
          <option value="2">Current Account</option>
        </Form.Select>
        <ErrorMessage errors={errors} name="account" />
        <br />

        <Form.Label>Personal Information</Form.Label>
        <Row className="mb-3">
          <Col xs="auto" className="my-1">
            <Form.Label
              className="me-sm-2"
              htmlFor="inlineFormCustomSelect"
              visuallyHidden
            >
              Preference
            </Form.Label>
            <Form.Select
              className="me-sm-2"
              id="inlineFormCustomSelect"
              {...register("prefix", { required: "This is required." })}
            >
              <option value="0">prefix</option>
              <option value="1">Mr.</option>
              <option value="2">MRs.</option>
              <option value="3">Miss.</option>
            </Form.Select>
            <ErrorMessage errors={errors} name="prefix" />
          </Col>
          <Col>
            <Form.Control
              placeholder="First name"
              {...register("firstName", { required: "Name required." })}
            />
            <ErrorMessage errors={errors} name="firstName" />
          </Col>
          <Col>
            <Form.Control
              placeholder="Last name"
              {...register("lastName", { required: "Name required." })}
            />
            <ErrorMessage errors={errors} name="lastName" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email required." })}
              />
              <ErrorMessage errors={errors} name="email" />
            </Col>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            {...register("addr1", { required: "Address required." })}
          />
          <ErrorMessage errors={errors} name="addr1" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            {...register("addr2")}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              {...register("city", { required: "State required." })}
            />
            <ErrorMessage errors={errors} name="city" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              {...register("state", { required: "State required." })}
            >
              <option>Choose...</option>
              <option>J&k</option>
              <option>WB</option>
              <option>TN</option>
              <option>MP</option>
              <option>AP</option>
            </Form.Select>
            <ErrorMessage errors={errors} name="state" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              {...register("zip", {
                required: "Valid ZIP code is required.",
                minLength: 6,
              })}
            />
            <ErrorMessage errors={errors} name="zip" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Current address is same as permanent address"
            {...register("currentAddress")}
          />
        </Form.Group>
        <Form.Label
          className="me-sm-2"
          htmlFor="inlineFormCustomSelect"
          visuallyHidden
        >
          Preference
        </Form.Label>
        <Form.Select
          className="me-sm-2"
          id="inlineFormCustomSelect"
          {...register("gender", { required: "Gender required." })}
        >
          <option value="0">Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Others</option>
        </Form.Select>
        <ErrorMessage errors={errors} name="gender" />
        <br />
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Prefix" {...register("countryCode")} />
          </Col>
          <Col>
            <Form.Control
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Enter a valid Phone Number.",
                minLength: 10,
              })}
            />
            <ErrorMessage errors={errors} name="phoneNumber" />
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={addPhoneNumber}>
              + Add
            </Button>
          </Col>
        </Row>

        {/* <Button variant="primary" type="submit">
          Submit
        </Button> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SimpleForm;
