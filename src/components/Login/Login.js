import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("*please provide a valid email")
      .required("*email is required"),
    password: yup
      .string()
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
    const res = await fetch(
      "https://rose-doubtful-moth.cyclic.app/user/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    const resp = await res.json();
    console.log(resp);
    if (resp.message === "Logged in successfuy") {
      setIsLogin(true);
      console.log("Logged in");
    } else {
      console.log("NOOOOOO");
    }
    console.log(isLogin);
  };
  const onError = () => {
    console.log("Error");
  };

  <form />;

  return (
    <>
      <Container id="login">
        <Row>
          <Col className="left-login"></Col>
          <Col className="right-login">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
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
              <Button variant="primary" type="submit" className="login-button">
                Submit
              </Button>
            </Form>

            <div className="signup-with">
              <p>
                {/* <i class="fa-solid fa-minus"></i> */}
                Or SignUp With
                {/* <i class="fa-solid fa-minus"></i> */}
              </p>
            </div>

            <div className="sign-up-logos">
              {/* <i class="fa-brands fa-facebook"></i> */}
              <img src={require("./../Login/facebook.png")} alt="" />
              <img src={require("./../Login/twitter.png")} alt="" />
              <img src={require("./../Login/linkedin.png")} alt="" />
              <img src={require("./../Login/google.png")} alt="" />
              <img src={require("./../Login/instagram.png")} alt="" />
            </div>
            <p className="login-bottom-reg">
              Don't have an account?
              <Link className="reg" to="/register">
                Register
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
