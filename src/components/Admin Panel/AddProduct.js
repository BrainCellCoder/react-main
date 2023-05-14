import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const allowedFileTypes = ["image/jpeg", "image/png"];
  const { handleSubmit, watch, register } = useForm({});
  const selectedFile = watch("file");

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.file[0]);
    // Send the form data and file to the server
    const res = await fetch("http://localhost:8000/admin/product/new", {
      method: "POST",
      body: formData,
    });
    const resp = await res.json();
    console.log(resp);
  };

  return (
    <>
      <Button
        sx={{ margin: "1rem" }}
        onClick={handleOpen}
        variant="contained"
        color="success"
      >
        + Add Product
      </Button>
      <Modal
        // sx={{ backgroundColor: "#fff" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add a new product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="category"
              type="text"
              {...register("category")}
              placeholder="category"
            />

            <input
              name="name"
              type="text"
              {...register("name")}
              placeholder="name"
            />
            <input
              name="description"
              type="text"
              {...register("description")}
              placeholder="description"
            />

            <input
              name="price"
              type="number"
              {...register("price")}
              placeholder="price"
            />

            <input name="file" type="file" {...register("file")} />

            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
