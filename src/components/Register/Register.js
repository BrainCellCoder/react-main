import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().min(4, "Minimum 4 chars").required("*name is required"),
    email: yup
      .string()
      .email("*please provide a valid email")
      .required("*email is required"),
    password: yup
      .string()
      .min(4, "*password must be atleast 4 characters")
      .max(20)
      .required("*password is required"),
    cPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .min(4, "*password must be atleast 4 characters")
      .max(20)
      .required("*password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // https://react-http-9d849-default-rtdb.firebaseio.com/
  // https://rose-doubtful-moth.cyclic.app/user/register
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const res = await fetch(
      "https://ecommercetechv.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          cPassword: data.cPassword,
        }),
      }
    );
    const resp = await res.json();
    console.log(resp);
    if (resp.success === true) {
      toast.success(resp.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
      setLoading(false);
    } else if (resp.success === false) {
      console.log("falied");
      toast.error(resp.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const onError = () => {
    console.log("Error");
  };

  return (
    <>
      <Container id="register">
        <Col className="right-reg">
          <h1>
            Register <i className="fa-regular fa-pen-to-square"></i>
          </h1>
          <Form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                {...register("name")}
              />
              <p className="error-message">{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                {...register("email")}
              />
              <p className="error-message">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                {...register("password")}
              />
              <p className="error-message">{errors.password?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                {...register("cPassword")}
              />
              <p className="error-message">{errors.cPassword?.message}</p>
            </Form.Group>
            <Button variant="primary" type="submit" className="login-button">
              {loading ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Register"
              )}
            </Button>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              // closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <p className="reg-bottom-login">
              Already have an account?
              <Link className="reg-login" to="/login">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Container>
    </>
  );
};
