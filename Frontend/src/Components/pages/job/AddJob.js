import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, useFormik } from "formik";
import axios from "axios";
import Popup from "../../../Common/Popup";
import { JobValidationSchema } from "../../../validation /validation";

const initialData = {
  title: "",
  tags: "",
  notes: "",
  tax: 7,
  product: "",
  subtotal: 0,
  total: 0,
};

const AddJob = ({ getJObData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setProducts(response.data.data);
    });
  }, [products]);

  const formik = useFormik({
    initialValues: initialData,
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is Required";
      }
      return errors;
    },
    onSubmit: (values) => {
      createJob(values);
    },
  });

  const handleChangee = (e) => {
    const { value } = e.target;

    const selectedProduct = products.find((product) => product._id === value);

    if (selectedProduct) {
      const subtotal = selectedProduct.price;
      const taxRate = 0.07;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      formik.setFieldValue("product", selectedProduct._id);
      formik.setFieldValue("subtotal", subtotal.toFixed(2));
      formik.setFieldValue("tax", tax.toFixed(2));
      formik.setFieldValue("total", total.toFixed(2));
    } else {
      formik.setFieldValue("product", "");
      formik.setFieldValue("subtotal", "0");
      formik.setFieldValue("tax", "0");
      formik.setFieldValue("total", "0");
    }
  };

  const createJob = (values, formik) => {
    const tagsArray =
      typeof values.tags === "string" ? [values.tags] : values.tags;
    const updatedValues = {
      ...values,
      product: formik.values.product,
      tags: tagsArray,
      tax: formik.values.tax,
      subtotal: formik.values.subtotal,
      total: formik.values.total,
    };
    axios
      .post(`http://localhost:5000/job`, updatedValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getJObData();
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
        onClose();
      });
  };

  return (
    <div>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon mb={1} />}
      >
        Add Job
      </Button>

      <Popup title="Add new job" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialData}
          validationSchema={JobValidationSchema}
          onSubmit={(values) => {
            createJob(values, formik);
          }}
        >
          {({
            values,
            errors,
            isValid,
            touched,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={8}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  autoComplete="off"
                  placeholder="Enter Title"
                />
                <Text color="tomato">
                  {errors.title && touched.title && errors.title}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Tags</FormLabel>
                <Input
                  type="text"
                  name="tags"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tags}
                  autoComplete="off"
                  placeholder="Enter Tags ex: one,two,three"
                />
                <Text color="tomato">
                  {errors.tags && touched.tags && errors.tags}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Notes</FormLabel>
                <Input
                  type="text"
                  name="notes"
                  placeholder="Enter Notes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.notes}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.notes && touched.notes && errors.notes}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Tax</FormLabel>
                <Input
                  type="number"
                  name="tax"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tax}
                  autoComplete="off"
                  isReadOnly
                />
                <Text color="tomato">
                  {errors.tax && touched.tax && errors.tax}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Product</FormLabel>
                <select
                  name="product"
                  onChange={handleChangee}
                  onBlur={formik.handleBlur}
                  value={formik.values.product}
                >
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <Text color="tomato">
                  {formik.errors.product &&
                    formik.touched.product &&
                    formik.errors.product}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Subtotal</FormLabel>
                <Input
                  type="number"
                  name="subtotal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formik.values.subtotal}
                  autoComplete="off"
                  readOnly
                />
                <Text color="tomato">
                  {errors.subtotal && touched.subtotal && errors.subtotal}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Total</FormLabel>
                <Input
                  type="number"
                  name="total"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formik.values.total}
                  autoComplete="off"
                  isReadOnly
                />
                <Text color="tomato">
                  {errors.total && touched.total && errors.total}
                </Text>
              </FormControl>

              <ButtonGroup variant="outline" spacing="3" my={8}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </Button>

                <Button colorScheme="blue" onClick={onClose} variant="outline">
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          )}
        </Formik>
      </Popup>
    </div>
  );
};

export default AddJob;
