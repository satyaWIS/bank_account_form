import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import Select from "react-select";
import axios from "axios";
import transformer, { validateContactNos } from "../helper/transformer";
import { userSchema } from "../Validations/userValidation";
import "./Form.css";

const SimpleForm = () => {
  const apiLink = "/api/submituser";
  const getApiLink = "/api/userdetails";
  const [contactList, setContactList] = useState([
    { countryCode: 0, phoneNumber: 0 },
  ]);
  const [user, setUser] = useState(null);
  const [getUser, setGetUser] = useState(null);

  // effect runs on component mount
  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(
      () =>
        setUser({
          firstName: "Alex",
          lastName: "Lee",
          email: "eyz@example.com",
          addr1: "123, Park Avenue Road",
          addr2: "Bay Area, LA",
          city: "Bay Area",
          zip: "1234567",
          phoneNumber: "1234567890",
        }),
      1000
    );
  }, []);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  const options = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "devorced", label: "devorced" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    data.phoneNumber = contactList;
    let validPhoneNumber = validateContactNos(data.phoneNumber);

    if (validPhoneNumber) {
      const transformedData = transformer(data);
      transformedData["contactDetails"] = data.phoneNumber;
      console.log("POSTING DATA", transformedData);
      axios
        .post(apiLink, {
          fulldata: transformedData,
        })
        .then((response) => setGetUser(response.data));
    } else {
      alert("Invalid Phone Number");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...contactList];
    list[index][name] = value;
    setContactList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...contactList];
    list.splice(index, 1);
    setContactList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setContactList([...contactList, { countryCode: 0, phoneNumber: 0 }]);
  };

  const getData = () => {
    axios.get(getApiLink).then((response) => {
      console.log("Before", response.data);
      setGetUser(response.data);
      console.log("After", getUser);
    });
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
          defaultValue="Select Account Type"
          name="accountType"
          // control={...register("accountType")}
          {...register("accountType", { required: "This is required." })}
        >
          <option value="Savings Account">Savings Account</option>
          <option value="Current Account">Current Account</option>
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
              <option value="Mr">Mr</option>
              <option value="Mrs">MRs</option>
              <option value="Miss">Miss</option>
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
              {...register("state")}
            >
              <option>Choose...</option>
              <option value="Jammu and kashmir">J&k</option>
              <option value="West Bengal">WB</option>
              <option value="Tamil Nadu">TN</option>
              <option value="Madhya Pradesh">MP</option>
              <option value="Andra Pradesh">AP</option>
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
            name="sameAddr"
            value="true"
            {...register("sameAddr")}
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            value="male"
            {...register("gender")}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value="female"
            {...register("gender")}
          />
          <Form.Check
            type="radio"
            label="Others"
            name="gender"
            value="others"
            {...register("gender")}
          />
        </Form.Group>

        <br />
        {contactList.map((x, i) => {
          return (
            <Row key={i} className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Country Code"
                  name="countryCode"
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
                {contactList.length !== 1 && (
                  <Button onClick={() => handleRemoveClick(i)} className="mr10">
                    -
                  </Button>
                )}
                {contactList.length - 1 === i && (
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
          <Select options={options} name="status" {...register("status")} />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            className="btn btn-secondary"
          >
            Reset
          </Button>
        </Form.Group>
      </Form>
      <Button onClick={() => getData()}>Get Data</Button>
      <Container className="text-center">
        {getUser && (
          <>
            <p>Name : {`${getUser.firstName} ${getUser.lastName}`}</p>
            <p>Email : {`${getUser.email}`}</p>
            <p>
              Address :{" "}
              {`${getUser.address.addr1} ${getUser.address?.addr2} ${getUser.address.city} ${getUser.address.countryState} ${getUser.address.zip}`}
            </p>
            <p>
              Phone :{" "}
              {getUser.contactDetails.map((x, i) => {
                return `${x.countryCode} ${x.phoneNumber}`;
              })}
            </p>
          </>
        )}
      </Container>
    </div>
  );
};

export default SimpleForm;
