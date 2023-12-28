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
import Popup from "../../../Common/Popup";
import  {JobValidationSchema}  from "../../../validation /validation";

const EditJob = ({ jobData, getJObData, updateData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <div>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        rightIcon={<EditIcon mb={1} />}
      >
        Edit
      </Button>

      <Popup
        title="Update Job"
        isOpen={isOpen}
        onClose={onClose}
        jobData={jobData}
        isCentered
      >
        <Formik
          initialValues={{
            title: jobData.title,
            tags: jobData.tags.join(","),
            notes: jobData.notes,
            tax: jobData.tax,
            product: jobData.product,
            subtotal: jobData.subtotal,
            total: jobData.total,
          }}
          validationSchema={JobValidationSchema}
          onSubmit={(values) => {
            updateData(values);
          }}
        >
          {({
            values,
            errors,
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
                <Input
                  type="text"
                  name="product"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.product && touched.product && errors.product}
                </Text>
              </FormControl>

              <FormControl isRequired mt={8}>
                <FormLabel>Subtotal</FormLabel>
                <Input
                  type="number"
                  name="subtotal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subtotal}
                  autoComplete="off"
                  isReadOnly
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
                  value={values.total}
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
                  // disabled={!(isValid && dirty)}
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

export default EditJob;
