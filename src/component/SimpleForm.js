import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import Select from "react-select";
import axios from "axios";
import transformer, { validateContactNos } from "../helper/transformer";
import { userSchema } from "../Validations/userValidation";
import "./Form.css";

const SimpleForm = () => {
  const apiLink = "https://xyz.in/api/user";
  const [inputList, setInputList] = useState([
    { countryCode: 0, phoneNumber: 0 },
  ]);
  const options = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "devorced", label: "devorced" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    data.phoneNumber = inputList;
    let validPhoneNumber = validateContactNos(data.phoneNumber);
    console.log(validPhoneNumber);
    if (validPhoneNumber) {
      const isValid = await userSchema.isValid(data);
      const transformedData = transformer(data);
      transformedData["contactDetails"] = data.phoneNumber;
      if (isValid) {
        console.log("POSTING DATA", transformedData);
        axios.post(apiLink, transformedData).then((response) => data);
      }
    } else {
      alert("Invalid Phone Number");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    console.log("list: ", list);
    // phoneNumberArr[index] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { countryCode: 0, phoneNumber: 0 }]);
  };

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
              name="firstName"
              {...register("firstName")}
            />
            {errors.firstName?.message}
          </Col>
          <Col>
            <Form.Control
              name="lastName"
              placeholder="Last name"
              {...register("lastName")}
            />
            {errors.lastName?.message}
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.message}
            </Col>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="addr1"
            {...register("addr1")}
          />
          {errors.addr1?.message}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            name="addr2"
            {...register("addr2")}
          />
          {errors.addr2?.message}
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="City"
              name="city"
              {...register("city")}
            />
            {errors.city?.message}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select
              className="me-sm-2"
              name="state"
              defaultValue="Choose..."
              {...register("state")}
            >
              <option>Choose...</option>
              <option>J&k</option>
              <option>WB</option>
              <option>TN</option>
              <option>MP</option>
              <option>AP</option>
            </Form.Select>
            {errors.state?.message}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control placeholder="Zip" name="zip" {...register("zip")} />
            {errors.zip?.message}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Current address is same as permanent address"
            {...register("currentAddress")}
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Label>Gender</Form.Label>
          <Form.Check type="radio" label="Male" {...register("gender")} />
          <Form.Check type="radio" label="Female" {...register("gender")} />
          <Form.Check type="radio" label="Others" {...register("gender")} />
        </Form.Group>

        <br />
        {inputList.map((x, i) => {
          return (
            <Row key={i} className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Prefix"
                  // {...register("countryCode")}
                  onChange={(e) => handleInputChange(e, i)}
                  value={x.countryCode}
                />
                {errors.countryCode?.message}
              </Col>
              <Col>
                <Form.Control
                  placeholder="Phone Number"
                  name="phoneNumber"
                  // {...register("phoneNumber")}
                  onChange={(e) => handleInputChange(e, i)}
                  value={x.phoneNumber}
                />
                {errors.phoneNumber?.message}
              </Col>
              <Col className="btn-box">
                {inputList.length !== 1 && (
                  <Button onClick={() => handleRemoveClick(i)} className="mr10">
                    -
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button onClick={() => handleAddClick(i)} className="ms-2">
                    {" "}
                    +{" "}
                  </Button>
                )}
              </Col>
            </Row>
          );
        })}
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Label>Material Status</Form.Label>
          <Select options={options} name="status" {...register} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SimpleForm;
