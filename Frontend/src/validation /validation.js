import * as Yup from "yup";
import Constants from "../Common/Constants";

export const ProductvalidationSchema = Yup.object().shape({
  name: Yup.string().required(Constants.REQUIRED).min(2, Constants.MIN_LENGTH),

  description: Yup.string()
    .required(Constants.REQUIRED)
    .min(5, Constants.MIN_LENGTH),

  price: Yup.number()
    .required(Constants.REQUIRED)
    .positive(Constants.PRICE_POSITIVE_NUMBER)
    .integer(Constants.PRICE_INTEGER),
});

export const JobValidationSchema = Yup.object().shape({
  title: Yup.string().required(Constants.REQUIRED).min(2, Constants.MIN_LENGTH),

  notes: Yup.string(),

  tax: Yup.number().positive(Constants.POSITIVE_NUMBER),
});
