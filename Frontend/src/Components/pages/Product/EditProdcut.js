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
import { EditIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import axios from "axios";
import Popup from "../../../Common/Popup";

const EditUpdateProduct = ({ productData, getProductsData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  const updateData = (values) => {
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
  };

  return (
    <div>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        rightIcon={<EditIcon mb={1} />}
      >
        Edit
      </Button>

      <Popup title="Update Product" isOpen={isOpen} onClose={onClose} isCentered>
        <Formik
          initialValues={productData}
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
            updateData(values);
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
                  {errors.description && touched.description && errors.description}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
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
                  Update
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

export default EditUpdateProduct;

