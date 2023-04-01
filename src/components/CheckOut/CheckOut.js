import React, { useEffect, useState } from "react";
import "./CheckOut.css";

import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

export const CheckOut = () => {
  const [userData, setUserData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const handleOptionChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await user.json();
      setUserData(data);
    };
    fetchUser();
  }, [isNewAddress]);

  const toggleAddressForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const schema = yup.object().shape({
    address: yup.string().required("*address is required"),
    city: yup.string().required("*city is required"),
    state: yup.string().required("*state is required"),
    country: yup.string().required("*country is required"),
    pinCode: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(7)
      .typeError("*pincode is required"),
    phoneNo: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(10)
      .typeError("*phone number is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // setLoading(true);
    const res = await fetch("http://localhost:8000/user/me", {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        pinCode: data.pinCode,
        phoneNo: data.phoneNo,
      }),
    });
    const resp = await res.json();
    if (resp.success === true) {
      //   setLoading(false);
    }
    setIsNewAddress(!isNewAddress);
  };
  console.log(selectedOption);
  console.log("userdatau", userData);
  const onError = () => {
    console.log("Error");
  };

  return (
    <>
      <div id="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="checkout-user">
                <p className="checkout-number">1</p>
                <div className="checkout-user-name-email">
                  <p style={{ margin: "0" }}>User</p>
                  {userData.user?.name} : {userData.user?.email}
                </div>
              </div>
              <div className="delivery-address">
                <div className="delivery-address-head">
                  <p className="checkout-number">2</p>
                  <p className="checkout-address-head">DELIVERY ADDRESS</p>
                </div>
                <div className="address-list">
                  {userData.user?.shippingAddress.map((address, key) => (
                    <div key={key} className="address-list-radio">
                      <label className="address-list-label mb-3">
                        <input
                          className="input-type"
                          type="radio"
                          name="option"
                          value={JSON.stringify({
                            address: address.address,
                            city: address.city,
                            state: address.state,
                            country: address.country,
                            pinCode: address.pinCode,
                            phoneNo: address.phoneNo,
                          })}
                          onChange={handleOptionChange}
                        />
                        <div className="address-info">
                          <p>{address.address} </p>
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </label>
                    </div>
                  ))}
                  {/* <p>{selectedOption}</p> */}
                  <div className="add-address mb-3" onClick={toggleAddressForm}>
                    {showForm ? "Cancel" : "+ Add a new address"}
                  </div>
                  {showForm && (
                    <Form onSubmit={handleSubmit(onSubmit, onError)}>
                      <div className="row">
                        <div className="col-md-6">
                          <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Address"
                          >
                            <Form.Control
                              as="textarea"
                              placeholder="Address"
                              style={{ height: "85px" }}
                              name="address"
                              {...register("address")}
                            />
                            <p className="error-message">
                              {errors.address?.message}
                            </p>
                          </FloatingLabel>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter state"
                              name="state"
                              {...register("state")}
                            />
                            <p className="error-message">
                              {errors.state?.message}
                            </p>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter pincode"
                              name="pinCode"
                              {...register("pinCode")}
                            />
                            <p className="error-message">
                              {errors.pinCode?.message}
                            </p>
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter city"
                              name="city"
                              {...register("city")}
                            />
                            <p className="error-message">
                              {errors.city?.message}
                            </p>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter country"
                              name="country"
                              {...register("country")}
                            />
                            <p className="error-message">
                              {errors.country?.message}
                            </p>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Phone no.</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter phone"
                              name="phoneNo"
                              {...register("phoneNo")}
                            />
                            <p className="error-message">
                              {errors.phoneNo?.message}
                            </p>
                          </Form.Group>
                        </div>
                      </div>
                      <button className="address-submit-btn">Submit</button>
                    </Form>
                  )}
                </div>
              </div>
              <div className="orderSummary">
                <div className="orderSummary-head">
                  <p className="checkout-number">3</p>
                  <p className="orderSummary-text">ORDER SUMMARY</p>
                </div>

                <div className="orderSummary-list">
                  <div className="row">
                    {userData.user?.cart.map((item) => (
                      <div className="col-md-6 orderSummary-products">
                        <img src={item.image[0].url} />
                        <Link
                          to={`products/${item._id}`}
                          className="orderSummary-item-name"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};
