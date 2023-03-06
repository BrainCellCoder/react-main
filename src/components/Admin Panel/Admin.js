import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Admin = () => {
  const schema = yup.object().shape({
    name: yup.string().required("*product name is required"),
    price: yup.number("*price must be a number").required("*price is required"),
    description: yup
      .string()
      .min(10, "*description must be atleast 10 characters")
      .max(50, "*description must not exceed 50 characters")
      .required("*description is required"),
    category: yup.string().required("*category is required"),
    image: yup.mixed().required("*image(s) is required"),
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
    try {
      const res = await fetch(
        "https://rose-doubtful-moth.cyclic.app/admin/product/new",
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
          }),
        }
      );
      console.log(res);
      const resp = await res.json();
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  const onError = () => {
    console.log("Error");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="container w-50 mt-5"
      >
        <h1>Admin Panel (CREATE PRODUCT)</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            {...register("name")}
          />
          <p className="error-message">{errors.name?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            {...register("price")}
          />
          <p className="error-message">{errors.price?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            name="description"
            {...register("description")}
          />
          <p className="error-message">{errors.description?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product category"
            name="category"
            {...register("category")}
          />
          <p className="error-message">{errors.category?.message}</p>
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Image(s)</Form.Label>
          <Form.Control
            type="file"
            multiple
            name="image"
            {...register("image")}
          />
          <p className="error-message">{errors.image?.message}</p>
        </Form.Group>
        <Button variant="success" type="submit">
          Upload
        </Button>
      </Form>
    </>
  );
};
