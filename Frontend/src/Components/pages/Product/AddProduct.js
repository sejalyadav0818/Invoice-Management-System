import React from "react";
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
import { Formik } from "formik";
import axios from "axios";
import Popup from "../../../Common/Popup";
const initialData = {
  name: "",
  email: "",
  price: "",
};

const AddProduct = ({ getUsersData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const createProduct = (values) => {
    axios
      .post(`http://localhost:5000/product`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getUsersData();
        toast({
          title: res.message,
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          toast({
            title: error.response.data.message,
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });
        } else if (error.request) {
          // The request was made but no response was received
          toast({
            title: "No response received from the server",
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          toast({
            title: "An error occurred while sending the request",
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });
        }
        onClose();
      });
  };
  
  // const createProduct = (values) => {
  //   axios
  //     .post(`http://localhost:5000/product`, values, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       getUsersData();
  //       toast({
  //         title: res.message,
  //         status: "success",
  //         isClosable: true,
  //         position: "bottom",
  //         duration: 5000,
  //       });
  //       onClose();
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: error,
  //         status: "error",
  //         isClosable: true,
  //         position: "bottom",
  //         duration: 5000,
  //       });
  //       onClose();
  //     });
  // };
  return (
    <div>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon mb={1} />}
      >
        Add Product
      </Button>

      <Popup title="Add new product" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialData}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is Required";
            }
            if (!values.description) {
              errors.description = "Description is Required";
            }
            if (!values.price) {
              errors.price = "Price is Required";
            }
            return errors;
          }}
          onSubmit={(values) => {
            createProduct(values); 
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
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.name && touched.name && errors.name}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.price && touched.price && errors.price}
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

export default AddProduct;
