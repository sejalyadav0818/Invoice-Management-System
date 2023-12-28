import React from "react";
import {
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Popup from "../../../Common/Popup";
import { ProductvalidationSchema } from "../../../validation /validation";

const ProductForm = ({ productData, getProductsData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const performAction = (values) => {
    if (productData) {
      // Edit operation
      const { _id, name, description, price } = values;
      axios
        .patch(`http://localhost:5000/product/${_id}`, {
          name,
          description,
          price,
        })
        .then((res) => {
          getProductsData();
          toast({
            title: res.data.message,
            status: "success",
            isClosable: true,
            position: "bottom",
            duration: 2000,
          });
          onClose();
        })
        .catch((error) => {
          toast({
            title: error.message,
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 2000,
          });
          onClose();
        });
    } else {
      // Add operation
      axios
        .post(`http://localhost:5000/product`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          getProductsData();
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
            title: error.response.message,
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });
          onClose();
        });
    }
  };

  return (
    <div>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={productData ? <EditIcon mb={1} /> : <AddIcon mb={1} />}
      >
        {productData ? "Edit" : "Add"}
      </Button>

      <Popup
        title={`${productData ? "Edit" : "Add"} Product`}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <Formik
          initialValues={
            productData || { name: "", description: "", price: "" }
          }
          validationSchema={ProductvalidationSchema}
          onSubmit={(values) => {
            performAction(values);
          }}
        >
          {({
            isValid,
            dirty,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={8}>
                <FormLabel>Name</FormLabel>
                <Field type="text" name="name" autoComplete="off" as={Input} />
                <ErrorMessage name="name" component={Text} color="tomato" />
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Description</FormLabel>
                <Field
                  type="text"
                  name="description"
                  as={Input}
                  autoComplete="off"
                />
                <ErrorMessage
                  name="description"
                  component={Text}
                  color="tomato"
                />
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Price</FormLabel>

                <Field
                  type="number"
                  name="price"
                  as={Input}
                  autoComplete="off"
                />
                <ErrorMessage name="price" component={Text} color="tomato" />
              </FormControl>

              <ButtonGroup variant="outline" spacing="3" my={8}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={!isValid || !dirty}
                >
                  {productData ? "Update" : "Add"}
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

export default ProductForm;
