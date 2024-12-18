import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { baseUrl } from "../../Utils/baseUrl";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    // https://rose-doubtful-moth.cyclic.app/user/login
    const res = await fetch(`https://ecommercetechv.onrender.com/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const resp = await res.json();
    console.log(resp);
    if (resp.success === true) {
      setLoading(false);
      localStorage.setItem("token", resp.token);
      localStorage.setItem("user_id", resp.user._id);
      // document.cookie = `token=${resp.token}; path=/`;

      navigate("/");
    } else if (resp.success === false) {
      setError(true);
      navigate("/login");
      setLoading(false);
      console.log(resp.message);
      setErrorMsg(resp.message);
    }
  };
  const onError = () => {
    console.log("Error");
  };

  const google = async () => {
    try {
      console.log("google");
      window.open("https://ecommercetechv.onrender.com/auth/google", "_self");
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <>
      <Container id="login">
        {/* <Row> */}
        {/* <Col className="left-login"></Col> */}
        <Col className="right-login">
          <h1>
            Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </h1>
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
            {error && <p className="error-message">{errorMsg}</p>}
            <Button variant="primary" type="submit" className="login-button">
              {loading ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          {/* <div className="signup-with">
            <p>
              Or SignUp With
            </p>
          </div>

          <div className="sign-up-logo">
            <img
              src={require("./../Login/google.png")}
              alt=""
              onClick={google}
            />
            Google
          </div> */}
          <p className="login-bottom-reg">
            Don't have an account?
            <Link className="reg" to="/register">
              Register
            </Link>
          </p>
        </Col>
        {/* </Row> */}
      </Container>
    </>
  );
};
